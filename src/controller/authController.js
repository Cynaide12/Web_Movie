const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { generatePath } = require("react-router-dom");
const { secret } = require("../config/config");
const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};
class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { email, firstname, lastname, username, password } = req.body;
      const candidateEmail = await User.findOne({ email });
      if (candidateEmail) {
        return res.status(400).json({ message: "Такая почта уже занята" });
      }
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "Такой логин уже занят" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        email,
        firstname,
        lastname,
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      res.status(400).json({ message: "Registration error", e });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким логином не найден" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Введен неверный пароль" });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      res.status(400).json({ message: "Login error", e });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      return res.status(400).json({ message: "Ошибка", e });
    }
  }
  async changeRole(req, res) {
    try {
      const { username, newRole } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким ником не найден" });
      }
      const role = await Role.findOne({ value: newRole });
      if (!role) {
        return res.status(400).json({ message: "Недопустимая роль" });
      }
      if (user.roles == role.value) {
        return res
          .status(400)
          .json({ message: "У пользователя уже установлена такая роль" });
      }
      user.roles = [role.value];
      await user.save();
      return res.json({ message: "Роль пользователя успешно изменена" });
    } catch (e) {
      res
        .status(400)
        .json({ message: "Ошибка при изменении роли пользователя", e });
    }
  }
  async getUserInfo(req, res) {
    try {
      const userData = req.user;
      const userId = userData.id
      const user = await User.findById(userId)
      user.password = 'confidentially'
      res.json(user);
    } catch (e) {
      console.error("Error getting user info:", e);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
module.exports = new authController();
