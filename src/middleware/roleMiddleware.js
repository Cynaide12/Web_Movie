const { secret } = require("../config/config");
const jwt = require("jsonwebtoken");
module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method == "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.json({ message: "Пользователь не авторизован", isAdmin: false });
      }
      const { roles: userRoles } = jwt.verify(token, secret);
      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.json({ message: "У вас нет доступа", isAdmin: false });
      }
      next();
    } catch (e) {
      return res.json({ message: "Пользователь не авторизован", isAdmin: false });
    }
  };
};
