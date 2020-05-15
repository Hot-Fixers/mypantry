// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the Ingredients
  app.get("/api/ingredients", function(req, res) {
    var query = {};
    if (req.query.User_id) {
      query.UserId = req.query.User_id;
    }
    db.Ingredients.findAll({
      where: query
    }).then(function(dbIngredients) {
      res.json(dbIngredients);
    });
  });

  // POST route for saving a new Ingredients
  app.post("/api/ingredients", function(req, res) {
    console.log(`req: ${req.body}\n`);
    db.Ingredients.create(req.body).then(function(dbIngredients) {
      res.json(dbIngredients);
    });
  });

  // DELETE route for deleting Ingredients
  app.delete("/api/ingredients/:id", function(req, res) {
    db.Ingredients.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbIngredients) {
      res.json(dbIngredients);
    });
  });

  // PUT route for updating Ingredients
  app.put("/api/ingredients", function(req, res) {
    db.Ingredients.update(
      req.body,
      {
        where: {
          id: req.body.IngId
        }
      }).then(function(dbIngredients) {
      res.json(dbIngredients);
    });
  });
};
