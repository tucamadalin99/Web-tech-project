const UserModel = require('../models').User;
const validateRegister = require('./validations/validate-register');
const bcrypt = require('bcrypt');
const { User } = require('../models');

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

    }
}

module.exports = controller;