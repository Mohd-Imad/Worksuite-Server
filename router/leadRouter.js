import express from 'express'
import Lead from '../model/lead.js'

let router = express.Router()

/*
URL : http://127.12.23.45:8000/leads/add
Method : POST
required field : salutation, name, company, email, mobile
*/
router.post('/add', async (request, response) => {
    try {
        let newLead = {
            salutation: request.body.salutation,
            name: request.body.name,
            company_name: request.body.company_name,
            email: request.body.email,
            mobile: request.body.mobile,
            allow_followup: request.body.allow_followup,
            website: request.body.website,
            date: request.body.date,
            status: request.body.status,
            country_image: request.body.country_image,
            country_name: request.body.country_name,
        }

        let lead = await Lead.findOne({ email: newLead.email })
        if (lead) {
            return response.status(404).json({
                msg: "Lead already exist...!"
            })
        }
        let createLead = await Lead(newLead)
        let saveLead = await createLead.save()
        response.status(200).json({
            msg: "Lead successfully added...",
            lead: saveLead
        });
    }
    catch (err) {
        console.log(err);
    }
})

/*
URL : http://127.12.23.45:8000/leads/all
Method : GET
required field : none
*/
router.get("/all", async (request, response) => {
    let leads = await Lead.find()
    response.status(200).json(leads)
});

/*
URL : http://127.12.23.45:8000/leads/:id
Method : GET
required field : id
*/
router.get("/:id", async (request, response) => {
    let lead_ID = request.params.id
    try {
        let lead = await Lead.findById(lead_ID)
        if (!lead) {
            return response.status(300).json({
                msg: "lead doesn't exist...!"
            })
        }
        response.status(200).json(lead)
    }
    catch (err) {
        console.log(err);
    }
});

/*
URL : http://127.12.23.45:8000/leads/update/:id
Method : PUT
required field : id, salutation, name, company, email, mobile
*/
router.put("/update/:id", async (request, response) => {
    let Lead_ID = request.params.id
    try {
        const updatedLead = {
            salutation: request.body.salutation,
            name: request.body.name,
            company_name: request.body.company_name,
            email: request.body.email,
            mobile: request.body.mobile,
            allow_followup: request.body.allow_followup,
            website: request.body.website,
            date: request.body.date,
            status: request.body.status,
            country_image: request.body.country_image,
            country_name: request.body.country_name,
        }

        let existingLead = await Lead.findById(Lead_ID)
        if (!existingLead) {
            return response.status(300).json({
                msg: "Lead doesn't exist...!"
            })
        }
        let newLead = await Lead.findByIdAndUpdate(Lead_ID, { $set: updatedLead }, { new: updatedLead })
        response.status(200).json({
            msg: 'lead updated successfully...!',
            updatedLead: newLead
        })
    }
    catch (error) {
        console.log(error);
    }
})

/*
URL : http://127.12.23.45:8000/leads/delete/:id
Method : DELETE
required field : id
*/
router.delete('/delete/:id', async (request, response) => {
    let lead_ID = request.params.id
    try {
        let lead = await Lead.findById(lead_ID)
        if (!lead) {
            return response.status(300).json({
                msg: "lead doesn't exist...!"
            })
        }
        let deleteLead = await Lead.findByIdAndDelete(lead_ID)
        response.status(200).json({
            msg: 'lead deleted successfully...!',
            deletedLead: deleteLead
        })
    }
    catch (err) {
        console.log(err)
    }
})

export default router