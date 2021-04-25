const config = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  logging: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
}); 

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);
db.setting = require('../models/setting.model.js')(sequelize, Sequelize);
db.recipe = require('../models/recipe.model.js')(sequelize, Sequelize);
db.ingredient = require('../models/ingredient.model.js')(sequelize, Sequelize);

db.user.hasMany(db.recipe);
db.recipe.belongsTo(db.user);

db.user.hasMany(db.ingredient);
db.ingredient.belongsTo(db.user);

db.recipe.hasMany(db.ingredient);
db.ingredient.belongsTo(db.recipe);

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.user.setting = db.user.hasOne(db.setting, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

db.setting.belongsTo(db.user);

db.ROLES = ['user', 'admin', 'moderator', 'pro'];

module.exports = db;
