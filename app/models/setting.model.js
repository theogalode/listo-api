module.exports = (sequelize, Sequelize) => {
  const Setting = sequelize.define("settings", {
    nightTheme: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    notification: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return Setting;
};