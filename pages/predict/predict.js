import * as tf from "@tensorflow/tfjs";
import { classes } from "@/service/classes";

export default {
    data() {
        return {
            models: [
                { title: "VGG16", value: "vgg" },
                { title: "MobileNet", value: "mobilenet" }
            ],
            image: {
                isUploaded: false,
                data: ""
            },
            model: null,
            imageNetClasses: classes,
            predictions: {
                top3: [],
                hasPrediction: false
            }
        };
    },
    methods: {
        pickFile() {
            this.$refs.picker.click();
        },
        previewImage(event) {
            let input = event.target;

            if (input.files && input.files[0]) {
                let reader = new FileReader();
                reader.onload = e => {
                    this.image.data = e.target.result;
                    this.image.isUploaded = true;
                };
                reader.readAsDataURL(input.files[0]);
            }
        },
        clearImage() {
            this.image.isUploaded = false;
            this.image.data = "";
            this.predictions.top3 = [];
            this.predictions.hasPrediction = false;
        },
        preprocessImage(image, modelName) {
            let img = new Image();
            img.src = image;
            let tensor = tf
                .fromPixels(img)
                .resizeNearestNeighbor([224, 224])
                .toFloat();

            switch (modelName) {
                case undefined:
                    return tensor.expandDims();
                //let meanImageNetRGB = tf.tensor1d([123.68, 116.779, 103.939])
                case "vgg16":
                    return tensor
                        .sub(tf.tensor1d([123.68, 116.779, 103.939]))
                        .reverse(2)
                        .expandDims();
                //let offset = tf.scalar(127.5);
                case "mobilenet":
                    return tensor
                        .sub(tf.scalar(127.5))
                        .div(tf.scalar(127.5))
                        .expandDims();
                default:
                    throw new Error("Unknown Model");
            }
        },
        async loadModel() {
            /* this.model = await tf.loadModel(`http://localhost:3000/vgg16/model.json`) */
            this.model = await tf.loadModel(
                "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json"
            );
        },
        async predict() {
            let image = this.image.data;
            let tensor = this.preprocessImage(image, "mobilenet");

            let prediction = await this.model.predict(tensor).data();

            this.predictions.hasPrediction = true;

            this.predictions.top3 = Array.from(prediction)
                .map((prob, index) => {
                    return {
                        probability: prob,
                        className: this.imageNetClasses[index]
                    };
                })
                .sort((a, b) => b.probability - a.probability)
                .slice(0, 3);
        }
    },
    created() {
        this.loadModel();
    }
};