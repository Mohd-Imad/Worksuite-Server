import express, { response } from 'express'
import newLead from '../model/newLead.js'

let router = express.Router()

//for digital lead form
/*
URL : http://127.12.23.45:8000/newleads/add
Method : POST
required field : email
*/
router.post('/add', async (request, response) => {
    try {
        let leadDetails = {
            name: request.body.name,
            email: request.body.email,
            company_name: request.body.company_name,
            website: request.body.website,
            address: request.body.address,
            mobile: request.body.mobile,
            message: request.body.message,
            city: request.body.city,
            state: request.body.state,
            country: request.body.country,
            postal_code: request.body.postal_code
        }

        let lead = await newLead.findOne({ email: leadDetails.email })
        if (lead) {
            return response.status(404).json({
                msg: "lead already exist...!"
            })
        }

        let createLead = await newLead(leadDetails)
        let saveLead = await createLead.save()
        response.status(200).json({
            msg: "lead created successfully...!",
            lead: saveLead
        })
    }
    catch (err) {
        console.log(err)
    }
})

/*
URL : http://127.12.23.45:8000/newleads/all
Method : GET
required field : None
*/
router.get('/all', async (request, response) => {
    let leads = await newLead.find()
    response.status(200).json(leads)
})

export default router