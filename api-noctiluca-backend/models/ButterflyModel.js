import mongoose from "mongoose";

const butterflySchema = new mongoose.Schema({
    name: { type: String, required: true },
    other_names: String,
    family: { type: String, required: true },
    location: { type: String, required: true },
    habitat: { type: String, required: true },
    morphology: { type: String, required: true },
    life: { type: String, required: true },
    feeding: { type: String, required: true },
    conservation: { type: String, required: true },
    about_conservation: {
        type: String,
        enum: ['LC', 'NT', 'VU', 'EN', 'CR', 'EW', 'EX', 'DD', 'NE'],
        required: true
    },
    image: String
}, {
    timestamps: true
});

const ButterflyModel = mongoose.model("Butterfly", butterflySchema);

export default ButterflyModel;