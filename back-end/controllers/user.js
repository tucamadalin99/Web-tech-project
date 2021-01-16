const UserModel = require('../models').User;
const ProductModel = require('../models').Product;
const GroupModel = require('../models').Group;
const GroupshipModel = require('../models').Groupship;
const FriendshipModel = require('../models').Friendship;
const FriendModel = require('../models').Friend;
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
                include: [ProductModel,GroupModel, FriendModel]
            });
            res.status(200).send(users);
        } catch {
            res.status(500).send({ message: "Server error!" })
        }

    },

    getUser: async (req, res) => {
        try {
            const user = await UserModel.findOne({
                include: [ProductModel, GroupModel, FriendModel],
                where: {
                    id: req.params.id
                }
            });
            if(user)
                res.status(200).send(user);
            else
                res.status(400).send({message:"User not found"})
        } catch {
            res.status(500).send({message:"Server error"})
        }
    },


    createGroup: async (req, res) => {
        const currentUser = await req.user;
        const newGroup = {
            groupName: req.body.groupName,
            groupType: req.body.groupType
        }
        GroupModel.create(newGroup).then(async resp => {
            const groupship = {
                userId: currentUser.id,
                groupId: resp.id
            }
            try {
                GroupshipModel.create(groupship);
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
            await GroupshipModel.create(user);
        }
        res.status(201).send({ message: "Users added to group!" });
        } catch (err) {
            res.status(500).send({message:"Server error!"})
        }
    },

    updateUser: async (req, res) => {
        let currentUser = await req.user;
        let hashedPass;
        if (req.body.password !== null) {
        let password = req.body.password;
        hashedPass = await bcrypt.hash(password, 10);
        } else {
            hashedPass = currentUser.password;
        }
        currentUser.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPass,
            address: req.body.address,
    
        }).then(() => {
            res.status(200).send({message: "User succesfully updated!"})
        }).catch(() => {
            res.status(500).send({message: "Server error"})
        })
    },

    sendInvite: async (req, res) => {
        const currentUser = await req.user;
        const friend = {
            status:'pending',
            name: req.body.name,
            type: req.body.type,
        }
        FriendModel.create(friend).then(async currentUser => {
            const friendship = {
                userId: currentUser.id,
                friendId: req.params.id
            }
            try {
                FriendshipModel.create(friendship);
                res.status(201).send({message:"Tai coiu merge"})
            } catch (err) {
                res.statis(500).send({message:"A crapat manca mi ar pula"})
            }
        }).catch(() => {
            res.status(500).send({message:"Erroare la server"})
        })
    },

    //  createGroup: async (req, res) => {
    //     const currentUser = await req.user;
    //     const newGroup = {
    //         groupName: req.body.groupName,
    //         groupType: req.body.groupType
    //     }
    //     GroupModel.create(newGroup).then(async resp => {
    //         const groupship = {
    //             userId: currentUser.id,
    //             groupId: resp.id
    //         }
    //         try {
    //             GroupshipModel.create(groupship);
    //             res.status(201).send({message:"Group added!"})
    //         } catch (err) {
    //             res.status(500).send({message:"Server error!"})
    //         }    
    //     }).catch(() => { res.status(500).send({ message: "Error" }) })
    // },


    handleInvite: async (req, res) => {
        const request = await FriendModel.findOne({
            where: {

            }
        })
        
    },

}

module.exports = controller;