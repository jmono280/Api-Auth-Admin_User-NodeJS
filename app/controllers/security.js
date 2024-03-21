const _database = require("../models");
const User = _database.user;
const Roles = _database.roles;

const _Op = _database.sequelize.Op;

var JWT = require("jsonwebtoken");
var CRP = require("bcryptjs");

//Registro de usuario
exports.register = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    psw: CRP.hashSync(req.body.password, 8),
    rol: req.body.rol,
    avatar: req.body.avatar,
  })
    .then((user) => {
      Roles.findOne({
        where: {
          id: user.rol,
        },
      }).then((rol) => {
        console.log(rol.name);
        res.send({ message: "Usuario registrado correctamente!" });
      });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Existe un error, revise el envio de datos" });
    });
};

//Ingreso de usuario
exports.signin = (req, res) => {
  //Search username in database
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      //If user not found
      if (!user) {
        return res.status(404).send({ message: "NO existe el usuario." });
      }

      //Compare password
      var _psw = CRP.compareSync(req.body.password, user.psw);
      if (!_psw) {
        return res.status(401).send({
          accessToken: null,
          message: "Password not match!",
        });
      }

      const TOKEN = JWT.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          rol: user.rol,
        },
        process.env.SECRET,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 432000, // 12 hour
        }
      );

      res.status(200).send({
        TOKEN: TOKEN,
        id: user.id,
        username: user.username,
        email: user.email,
        rol: user.rol,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
