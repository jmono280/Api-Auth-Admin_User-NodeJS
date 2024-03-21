const _database = require("../models");
const User = _database.user;

exports.allContent = (req, res) => {
  res.status(200).send("API Online.");
};

exports.userContent = (req, res) => {
  res.status(200).send("Contenido Usuario.");
};

exports.adminContent = (req, res) => {
  res.status(200).send("Contenido Administrador.");
};

exports.allUsers = (req, res) => {
  // Find all users
  User.findAll()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error retornando los usuarios.",
      });
    });
};
