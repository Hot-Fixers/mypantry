module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define('Users', {
      // Giving the User model a name of type STRING
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }

    });
  
    Users.associate = function(models) {
      // Associating User with Ingredients
      // When a User is deleted, also delete any associated Ingredients
      Users.hasMany(models.Ingredients, {
        onDelete: "cascade"
      });
    };
  
    return Users;
  };