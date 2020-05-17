
// Creating our Ingredients model
module.exports = function(sequelize, DataTypes) {
  const Ingredients = sequelize.define("Ingredients", {
    // The Ingredients cannot be null
    Ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Amount:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
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
