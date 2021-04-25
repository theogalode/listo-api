module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USERNAME_DEV,
  PASSWORD: process.env.DB_PASSWORD_DEV,
  DB: "listo_sequelize",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};