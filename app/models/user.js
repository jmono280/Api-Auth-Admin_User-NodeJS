module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    psw: {
      type: Sequelize.STRING,
    },
    rol: {
      type: Sequelize.INTEGER,
    },
    avatar: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
