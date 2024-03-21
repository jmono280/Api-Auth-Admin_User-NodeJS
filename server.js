const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

//img folder
var path = require("path");
const publicDirectoryPath = path.join(__dirname, "./app/images");
app.use(express.static(publicDirectoryPath));
console.log(publicDirectoryPath);

//puerto de conexión con back
var corsOptions = {
  origin: "http://127.0.0.1:8088",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const _database = require("./app/models");
const _Roles = _database.roles;

_database.sequelize.sync();
_database.sequelize.sync({ force: false }).then(() => {
  //Coment two lines below to avoid roles creation
  _Roles.create({ id: 0, name: "admin" });
  _Roles.create({ id: 1, name: "user" });
});

// Rut test
app.get("/", (req, res) => {
  res.json({ message: "API is Online." });
});

// routes
require("./app/routes/jwt")(app);
require("./app/routes/user")(app);

// set port, listen for requests
const PORT = process.env.NODE_LOCAL_PORT || 8088;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
