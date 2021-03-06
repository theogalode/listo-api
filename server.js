const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan')

const app = express();

var corsOptions = {
  origin: "http://localhost:8080/api"
};

app.use(cors(corsOptions));
app.use(morgan('combined'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

  Role.create({
    id: 4,
    name: "pro"
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to listo application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});