module.exports = function (req, res, next) {
  // If logged in, continue 
  if (req.user) {
    return next();
  }

  // else redirect to home
  return res.redirect("/");
};