// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");
const axios = require("axios");
const _ = require("underscore");
require("dotenv").config();

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthen");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));

  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.render("index");
  });

  app.get("/add", isAuthenticated, async function (req, res) {
    try {
      const ingredients = await db.Ingredients.findAll({
        where: {
          UserId: req.user.id
        }
      });
      res.render("pantry", {
        items: ingredients.map(i => i.dataValues),
        uId: req.user.id
      });
    } catch (err) {
      throw err;
    }
  });

  app.get("/explore", isAuthenticated, async function (req, res) {
    try {
      const key = process.env.KEY;
      const ingredients = await db.Ingredients.findAll({
        where: {
          UserId: req.user.id
        }
      });
      const iMapped = ingredients.map(i => i = i.Ingredients);
      const iShuffled = _.shuffle(iMapped);
      const iFinal = iShuffled.slice(0, 6).join(",+");
      const dishes = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${iFinal}&number=10&apiKey=${key}`);
      const dMapped = dishes.data.map(d => d = d.id);
      const steps = [];
      for (let d of dMapped) {
        let s = await axios.get(`https://api.spoonacular.com/recipes/${d}/analyzedInstructions?apiKey=${key}`);
        steps.push({
          steps: s.data[0].steps
        });
      }
      const combined = [];
      for (let i = 0; i < dMapped.length; i++) {
        let c = {
          ...dishes.data[i],
          ...steps[i]
        };
        combined.push(c);
      }
      res.render("recipes", {
        recipes: combined
      });
    } catch (err) {
      throw err;
    }
  });
};