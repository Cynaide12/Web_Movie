const express = require("express");
const Router = express.Router();
const controller = require("../controller/movieController");
const roleMiddleware = require("../middleware/roleMiddleware");
const multer = require("multer");
const storage = require("../../server/multerSettings.js");
const authMiddleware = require("../middleware/authMiddleware");
const upload = multer({ storage });
Router.post(
  "/add-film",
  roleMiddleware(["ADMIN"]),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "sliderThumbnail", maxCount: 1 },
    { name: "filmSrc", maxCount: 1 }
  ]),
  controller.addFilm
);
Router.post("/delete-film", roleMiddleware(["ADMIN"]), controller.deleteFilm);
Router.get("/films", controller.getFilms);
Router.post("/get-film", controller.getFilm);
Router.post(
  "/change-film",
  roleMiddleware(["ADMIN"]),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "sliderThumbnail", maxCount: 1 },
    { name: "filmSrc", maxCount: 1 }
  ]),
  controller.changeFilm
);
Router.post("/add-favorites", authMiddleware, controller.addFavorites)
Router.post("/get-favorites", authMiddleware, controller.getFavorites)
Router.post("/get-films", controller.getFilmsByArray)
Router.get("/get-filmsByCategories", controller.getFilmsByCategory)
Router.post("/del-favorites", authMiddleware, controller.delFavorites)
module.exports = Router;
