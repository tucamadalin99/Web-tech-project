const connection = require('../models').connection;
const CategoriesModel = require('../models').Category;

const controller = {
    //Controller for db reset or create tables
    reset: (req, res) => {
        connection.sync({
            force: true
        }).then(() => {
            let category = {
                name: ""
            }
            const names = ["Fruit", "Vegetable", "Cooked Food", "Canned Food", "Raw Food", "Pastry"];
            names.forEach( async el => {
                category.name = el;
                await CategoriesModel.create(category);
            })
            res.status(200).send({ message: "Database succesfully reset and categories added!" });
        }).catch((err) => {
            res.status(500).send(err);
        })
    }
}

module.exports = controller;