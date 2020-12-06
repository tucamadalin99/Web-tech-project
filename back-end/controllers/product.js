const ProductModel = require('../models').Product;
const validateProduct = require('./validations/validate-product');

const controller = {
    addProduct: async (req, res) => {
        const currentUser = await req.user;
        console.log(currentUser.id);
        const newProduct = {
            name: req.body.name,
            expireDate: req.body.expireDate,
            brand: req.body.brand,
            price: req.body.price,
            count: req.body.count,
            userId: currentUser.id,
            status: "available",
            categoryId: req.body.categoryId
        }
        const errors = validateProduct(newProduct);
        if (Object.keys(errors).length === 0) {
            ProductModel.create(newProduct).then(() => {
                res.status(201).send({ message: "Product added succesfully!" });
            }).catch((err) => {
                res.status(500).send(err)
            })
        } else {
            res.status(400).send(errors);
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await ProductModel.findAll();
            res.status(200).send(products);
        } catch {
            res.status(500).send({message:"Server error!"})
       }
    }
}

module.exports = controller;