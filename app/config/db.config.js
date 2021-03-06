module.exports = {
  HOST: "theogalode.zapto.org",
  USER: "listoDev",
  PASSWORD: "ag6Z738BFz7pR3ZN78Cm5qzJb",
  DB: "listo_sequelize",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};