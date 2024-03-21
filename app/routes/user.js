const { jwt } = require("../middleware");
const user_controller = require("../controllers/user");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-influ-" + file.originalname);
  },
});

const fileUpload = multer({
  storage: diskstorage,
}).single("image");

module.exports = function (app) {
  //Cors acces
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Origin",
      "*",
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //Url test API
  app.get("/api/test/check", user_controller.allContent);
  //Url User Content
  app.get("/api/get/user", [jwt.isToken], user_controller.userContent);
  //Url Admin Content
  app.get(
    "/api/get/admin",
    [jwt.isToken, jwt.isModerator],
    user_controller.adminContent
  );
  //Url All Users, admin content
  app.get("/api/get/data", [jwt.isToken], user_controller.allUsers);
};
