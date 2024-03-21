const JWT = require("jsonwebtoken");
const _database = require("../models");
const User = _database.user;
const Roles = _database.roles;

isToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No tiene un token!",
    });
  }

  JWT.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "No Autorizado!",
      });
    }
    req.userId = decoded.rol;
    next();
  });
};

isAdmin = (req, res, next) => {
  Roles.findOne({ where: { id: req.userId } }).then((rol) => {
    if (rol.name === "admin") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Admin Role!",
    });
  });
};

isModerator = (req, res, next) => {
  Roles.findOne({ where: { id: req.userId } }).then((rol) => {
    if (rol.name === "admin") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Admin Role!",
    });
  });
};

const jwt = {
  isToken: isToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
};
module.exports = jwt;
