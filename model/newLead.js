import mongoose from "mongoose";

let newLeadSchema = mongoose.Schema;

let newSchema = new newLeadSchema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    company_name: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    mobile: {
        type: Number,
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    postal_code: {
        type: Number,
        required: false,
    },
})

let newLead = mongoose.model('newlead', newSchema)
export default newLead;