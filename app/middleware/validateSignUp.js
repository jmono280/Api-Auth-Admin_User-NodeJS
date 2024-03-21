const models = require("../models");
const User = models.user;

validateUserEmail = (req, res, next) => {
  // Search username in database already exist
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "!El nombre de usuario ya se encuentra en uso!",
      });
      return;
    }

    // Search email in database already exist
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "!El email ya se encuentra en uso!",
        });
        return;
      }
      next();
    });
  });
};

const validateSignUp = {
  validateUserEmail: validateUserEmail,
};

module.exports = validateSignUp;
