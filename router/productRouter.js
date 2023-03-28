import express from 'express'
import Product from '../model/product.js'

let router = express.Router()

/*
URL : http://127.12.23.45:8000/products/add
Method : POST
required field : name, price
*/
router.post('/add', async (request, response) => {
    try {
        let newProduct = {
            name: request.body.name,
            price: request.body.price,
            category: request.body.category,
            sub_category: request.body.sub_category,
            tax: request.body.tax,
            hsn_sac: request.body.hsn_sac,
            unit_type: request.body.unit_type,
            description: request.body.description
        }

        let product = await Product.findOne({ name: newProduct.name })
        if (product) {
            return response.status(404).json({
                msg: "Product already exist...!"
            })
        }

        let createProduct = await Product(newProduct)
        let saveProduct = await createProduct.save()
        response.status(200).json({
            msg: "Product successfully added...",
            product: saveProduct
        });
    }
    catch (err) {
        console.log(err);
    }
})

/*
URL : http://127.12.23.45:8000/products/all
Method : GET
required field : None
*/
router.get('/all', async (request, response) => {
    let products = await Product.find()
    response.status(200).json(products)
})

/*
URL : http://127.12.23.45:8000/products/:id
Method : GET
required field : id
*/
router.get("/:id", async (request, response) => {
    let product_ID = request.params.id
    try {
        let product = await Product.findById(product_ID)
        if (!product) {
            return response.status(300).json({
                msg: "Product doesn't exist...!"
            })
        }
        response.status(200).json(product)
    }
    catch (err) {
        console.log(err);
    }
});

/*
URL : http://127.12.23.45:8000/products/update/:id
Method : PUT
required field : id, name, price
*/
router.put("/update/:id", async (request, response) => {
    let product_ID = request.params.id
    try {
        const updateProduct = {
            name: request.body.name,
            price: request.body.price,
            category: request.body.category,
            sub_category: request.body.sub_category,
            tax: request.body.tax,
            hsn_sac: request.body.hsn_sac,
            unit_type: request.body.unit_type,
            description: request.body.description
        }

        let existingProduct = await Product.findById(product_ID)
        if (!existingProduct) {
            return response.status(300).json({
                msg: "Product doesn't exist...!"
            })
        }
        let newProduct = await Product.findByIdAndUpdate(product_ID, { $set: updateProduct }, { new: updateProduct })
        response.status(200).json({
            msg: 'Product updated successfully...!',
            updateProduct: updateProduct
        })
    }
    catch (error) {
        console.log(error);
    }
})

/*
URL : http://127.12.23.45:8000/products/delete/:id
Method : DELETE
required field : id
*/
router.delete('/delete/:id', async (request, response) => {
    let product_ID = request.params.id
    try {
        let product = await Product.findById(product_ID)
        if (!product) {
            return response.status(300).json({
                msg: "Product doesn't exist...!"
            })
        }
        let deleteProduct = await Product.findByIdAndDelete(product_ID)
        response.status(200).json({
            msg: 'Product deleted successfully...!',
            deletedproduct: deleteProduct
        })
    }
    catch (err) {
        console.log(err)
    }
})

export default router