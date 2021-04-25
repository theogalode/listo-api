module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("recipes", {
    title: {
      type: Sequelize.STRING,
      defaultValue: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cooking_instructions: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preparation_time: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    difficulty: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  });

  return Recipe;
};