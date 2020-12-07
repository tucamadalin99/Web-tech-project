const UserModel = require('../models').User;
const ProductModel = require('../models').Product;
const validateRegister = require('./validations/validate-register');
const bcrypt = require('bcrypt');
const { User, Product } = require('../models');

const controller = {
    //Controller object for user operations
    register: async (req, res) => {
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            type: req.body.type
        }
        const hashPass = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashPass;
        let validationErrors = validateRegister(newUser);
        if (Object.keys(validationErrors).length === 0) {
            UserModel.create(newUser).then(() => {
                res.status(201).send({message:"Succesfully registered!"})
            }).catch(err => {
                res.status(500).send(err);
            })
        } else {
            res.status(400).send(validationErrors);
        }
    },

    getAllUsers: async (req, res) => {
        try {
             const users = await UserModel.findAll();
        res.status(200).send(users);
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
                }else
                res.status(403).send({message: "The item has already been claimed by: " + userProduct.status})
            }
        } else {
            res.status(400).send({message: "Product not found or you are trying to claim your own items"})
        }
    }
}

module.exports = controller;