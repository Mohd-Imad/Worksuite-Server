import mongoose from "mongoose";

let leadSchema = mongoose.Schema;

let schema = new leadSchema({
    salutation: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    company_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    allow_followup: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    country_image: {
        type: String,
        required: false,
    },
    country_name: {
        type: String,
        required: false,
    },
})

let Lead = mongoose.model('leads', schema)
export default Lead;