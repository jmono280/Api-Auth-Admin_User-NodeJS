const { validateSignUp } = require("../middleware");
const auth_controller = require("../controllers/security");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Origin",
      "*",
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/jwt/register",
    [validateSignUp.validateUserEmail],
    auth_controller.register
  );

  app.post("/api/jwt/signin", auth_controller.signin);
};
