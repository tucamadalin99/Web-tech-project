const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const passport = require('passport');


router.post('/register', userController.register);

router.post('/login', checkAuth, passport.authenticate("local", {
    successRedirect: "/api/success",
    failureRedirect: "/api/fail"
}))

router.get('/success', async (req, res) => {
    res.status(200).send(await req.session);
})

router.get('/fail', async (req, res) => {
    res.status(403).send({message:"Email or password does not match!"})
})

router.get('/success', async (req, res) => {
    res.status(200).send(await req.session);
})

router.delete('/logout', checkNotAuth, async (req, res) => {
    req.logOut();
    res.status(200).send({message:"Logged out"});
})

router.get('/getUser', async(req,res) => {
    const user=await req.user;
    res.status(200).send(await req.user)
})

router.get('/notAuth', async (req, res) => {
    res.status(403).send({message:"You are not logged in."})
})


router.get('/alreadyAuth', async (req, res) => {
    res.status(403).send({message:"You are already logged in."})
})

router.get('/logoutInfo', async (req, res) => {
    res.status(403).send({message:"Succesfully logged out."})
})

router.get('/getAllUsers', checkNotAuth, userController.getAllUsers);

router.get('/getUser/:id', checkNotAuth, userController.getUser);

//router.get('/getRequests', checkNotAuth, userController.handleInvite);

router.post('/createGroup',checkNotAuth, userController.createGroup);

router.post('/addUsersToGroup', checkNotAuth, userController.addUsersToGroup);

router.post('/sendInvite/:friendId', checkNotAuth, userController.sendInvite);

router.put('/updateUser', checkNotAuth, userController.updateUser);

// router.put('/handleInvite/:userId/:response', checkNotAuth, userController.handleInvite);


function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/api/alreadyAuth')
    }
    return next();
}

function checkNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api/notAuth');
}

module.exports = {router, checkAuth, checkNotAuth};
