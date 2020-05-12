module.exports = function(sequelize, DataTypes) {
    const Ingredients = sequelize.define('Ingredients', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      amount: {
          type: DataTypes.INTEGER,
          defaultValue: 1
      }
    });
  
    Ingredients.associate = function(models) {
      // We're saying that an Ingredient should belong to a User
      // A Ingredient can't be created without a User due to the foreign key constraint
      Ingredients.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Ingredients;
  };