const connection = require('../models').connection;

const controller = {
    //Controller for db reset or create tables
    reset: (req, res) => {
        connection.sync({
            force: true
        }).then(() => {
            res.status(200).send({ message: "Database succesfully reset!" });
        }).catch((err) => {
            res.status(500).send(err);
        })
    }
}

module.exports = controller;