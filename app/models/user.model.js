module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your email'
        },
        isEmail: {
          msg: "Please enter a valid email"
        }
      }
    },
    password: {
      type: Sequelize.STRING(64),
    },
    birthday: {
      type: Sequelize.DATEONLY
    },
    bio: {
      type: Sequelize.STRING,
      allowNull: true
    },
    isPublic: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    isPro: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return User;
};