const UserModel = require('../models').User;
const ProductModel = require('../models').Product;
const GroupModel = require('../models').Group;
const FriendshipModel = require('../models').Friendship;
const validateRegister = require('./validations/validate-register');
const bcrypt = require('bcrypt');

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
                res.status(201).send({ message: "Succesfully registered!" })
            }).catch(err => {
                res.status(500).send(err);
            })
        } else {
            res.status(400).send(validationErrors);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.findAll({
                include: [ProductModel,GroupModel]
            });
            res.status(200).send(users);
        } catch {
            res.status(500).send({ message: "Server error!" })
        }

    },


    createGroup: async (req, res) => {
        const currentUser = await req.user;
        const newGroup = {
            groupName: req.body.groupName,
            groupType: req.body.groupType
        }
        GroupModel.create(newGroup).then(async resp => {
            const friendship = {
                userId: currentUser.id,
                groupId: resp.id
            }
            try {
                FriendshipModel.create(friendship);
                res.status(201).send({message:"Group added!"})
            } catch (err) {
                res.status(500).send({message:"Server error!"})
            }    
        }).catch(() => { res.status(500).send({ message: "Error" }) })
    },

    addUsersToGroup: async (req, res) => {
        let user = {
            userId: 0,
            groupId: 0
        }
        try {
            for (let i = 0; i < req.body.users.length; i++){
            user.userId = req.body.users[i];
            user.groupId = req.body.groupId
            await FriendshipModel.create(user);
        }
        res.status(201).send({ message: "Users added to group!" });
        } catch (err) {
            res.status(500).send({message:"Server error!"})
        }
    }
}

module.exports = controller;