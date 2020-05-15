
// Creating our Ingredients model
module.exports = function(sequelize, DataTypes) {
  var Ingredients = sequelize.define("Ingredients", {
    // The Ingredients cannot be null, and must be a proper email before creation
    Ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Amount:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Ingredients.associate = function(models) {
    //Associating with User table
    Ingredients.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Ingredients;
};
