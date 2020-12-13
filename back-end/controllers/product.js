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
    },

      claimProduct: async (req, res) => {
        const currentUser = await req.user;
        console.log(currentUser)
        const userProduct = await ProductModel.findOne({
            where: {
                userId: req.params.userId,
                id: req.params.id
            }
        })
        if (userProduct && currentUser.id !== userProduct.userId) {
            if (userProduct.status === 'available') {
                userProduct.update({
                    status: currentUser.firstName + " " + currentUser.lastName
                }).then(() => {
                    res.status(200).send({ message: "The item has been claimed!" });
                }).catch(err => {
                    res.status(500).send({ message: "Server error we apologise for the inconvenience" });
                })
            } else {
                if (currentUser.firstName + " " + currentUser.lastName === userProduct.status) {
                    res.status(400).send({ message: "You already claimed this item" });
                } else
                    res.status(403).send({ message: "The item has already been claimed by: " + userProduct.status })
            }
        } else {
            res.status(400).send({ message: "Product not found or you are trying to claim your own items" })
        }
    },

    unclaimProduct: async (req, res) => {
        const currentUser = await req.user;
        const userProduct = await ProductModel.findOne({
            where: {
                userId: req.params.userId,
                id: req.params.id
            }
        })
        if (userProduct && currentUser.id !== userProduct.userId) {
            if (userProduct.status === currentUser.firstName + " " + currentUser.lastName) {
                userProduct.update({
                    status: 'available'
                }).then(() => {
                    res.status(200).send({ message: "You unclaimed this item." })
                }).catch(() => {
                    res.status(500).send({ message: "Server error" })
                })
            } else {
                res.status(400).send({message:"The product was not claimed by you, you can't unclaim it."})
            }
        } else {
            res.status(400).send({ message: "Can't operate on your own items" })
        }
    },

    deleteProduct: async (req, res) => {
        const currentUser = await req.user;
        const product = await ProductModel.findOne({
            where: {
                userId: currentUser.id,
                id: req.params.id
            }
        })
        console.log(product);
        if (product) {
            await product.destroy();
            res.status(200).send({message:`Product: ${product.name} was destroyed`})
        } else {
            res.status(400).send({message:"Product does not exist"})
        }
    },
}

module.exports = controller;