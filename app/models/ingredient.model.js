module.exports = (sequelize, Sequelize) => {
  const Ingredient = sequelize.define("ingredients", {
    name: {
      type: Sequelize.STRING,
      defaultValue: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    unit: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Ingredient;
};