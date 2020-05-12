const db = require("../models");

/*
module.exports = (app) => {
    // Get
    app.get('/', async (req, res) => {
        try {
            res.render('index', {
                burgers: await db.Burger.findAll({}).map(burger => burger.dataValues)
            });
        }
        catch (err) {
            throw err;
        };
    });

    //Post
    app.post('/api/burger', async (req, res) => {
        try {
            res.json(await db.Burger.create(req.body));
        }
        catch (err) {
            throw err;
        };
    });

    //Put
    app.put('/api/burger', async (req, res) => {
        try {
            res.json(await db.Burger.update(
                { devoured: true },
                { where: {id: parseInt(req.body.id)} }
            ));
        }
        catch (err) {
            throw err;
        };
    });
};
*/

module.exports = (app) => {
    //GET
    app.get('/', async (req, res) => {
        res.json(await db.Ingredients.findAll({}).map(ingredient => ingredient.dataValues))
    })
}
