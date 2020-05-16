// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthen");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
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
    //res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render('../views/index.handlebars');
  });

  app.get("/add", isAuthenticated, function (req, res) {
    // res.sendFile(path.join(__dirname, "../public/add.html"));
    res.render('../views/additems.handlebars');
  });

  app.get("/explore", isAuthenticated, function (req, res) {
    // res.sendFile(path.join(__dirname, "../public/explore.html"));
    res.render('../views/recipes.handlebars');
  });


};