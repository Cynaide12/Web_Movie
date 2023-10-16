const Film = require("../models/Film");
const User = require("../models/User");
class movieController {
  async addFilm(req, res) {
    try {
      const { title, description, date, category, actors, trailer, isSlider, country } =
        req.body;
      let thumbnail = "";
      let currentCategory = category.split(" ");
      if (req.files["thumbnail"]) {
        thumbnail = req.files["thumbnail"][0];
      } else {
        thumbnail = req.file;
      }
      let sliderThumbnail = { path: "/assets/img/login/watch.png" };
      if (req.files["sliderThumbnail"]) {
        sliderThumbnail = req.files["sliderThumbnail"][0];
      }
      let filmSrc = "";
      if (req.files["filmSrc"]) {
        filmSrc = req.files["filmSrc"][0];
      }
      if (!title || !description || !date || !category || !country) {
        return res.json({ message: "Заполните все поля" });
      }
      if (
        isSlider == "true" &&
        sliderThumbnail.path == "/assets/img/login/watch.png"
      ) {
        return res
          .status(500)
          .json({ message: "Вы не указали изображение в слайдер" });
      }
      if (!thumbnail) {
        return res.json({ message: "Добавьте миниатюру" });
      }
      if (!filmSrc) {
        return res.json({ message: "Добавьте фильм" });
      }
      const film = new Film({
        title,
        description,
        date,
        category: currentCategory,
        thumbnail: thumbnail.path,
        filmSrc: filmSrc.path,
        isSlider,
        sliderThumbnail: sliderThumbnail.path,
        actors,
        trailer,
        country
      });
      await film.save();
      return res.json({ message: "Фильм добавлен", film });
    } catch (e) {
      res.status(400).json({ message: "Ошибка:" });
      console.error(e);
    }
  }
  async deleteFilm(req, res) {
    try {
      const { id } = req.body;
      const film = Film.findById(id);
      if (!film) {
        return res.status(404).json({ message: "Фильм не найден" });
      }
      await Film.findByIdAndDelete(id);
      return res.json({ message: "Фильм успешно удален" });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Ошибка при удалении фильма:" });
    }
  }
  async getFilms(req, res) {
    try {
      const films = await Film.find();
      return res.json(films);
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Ошибка при выводе фильмов" });
    }
  }
  async getFilm(req, res) {
    try {
      const { id } = req.body;
      const film = await Film.findById(id);
      return res.json(film);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Ошибка при получении данных фильма" });
    }
  }
  async getFilmsByCategory(req, res) {
    try {
      const films = await Film.find();

      const filmsByCategory = films.reduce((acc, film) => {
        film.category.forEach((category) => {
          const existingCategory = acc.find((entry) => entry._id === category);

          if (existingCategory) {
            existingCategory.films.push(film);
          } else {
            acc.push({
              _id: category,
              films: [film],
            });
          }
        });

        return acc;
      }, []);
      return res.json(filmsByCategory);
    } catch (e) {
      res.status(500).json({ message: "Ошибка при получении фильмов" });
    }
  }
  async getFilmsByArray(req, res) {
    try {
      const { ids } = req.body;
      if (ids == "123") {
        return res.json({
          message: "Вы еще не добавили фильмов в избранное",
          isLoading: true,
        });
      }
      const films = [];
      for (const id of ids) {
        const film = await Film.findById(id);
        if (film) {
          films.push(film);
        }
      }
      return res.json(films);
    } catch (e) {
      res.status(500).json({ message: "Ошибка при получении любимых фильмов" });
    }
  }
  async changeFilm(req, res) {
    try {
      const {
        id,
        title,
        description,
        category,
        date,
        actors,
        trailer,
        isSlider,
        country
      } = req.body;
      let thumbnail = "";
      let currentCategory = category.split(" ");
      if (req.files["thumbnail"]) {
        thumbnail = req.files["thumbnail"][0];
      } else {
        thumbnail = req.file;
      }
      let sliderThumbnail = { path: "/assets/img/login/watch.png" };
      if (req.files["sliderThumbnail"]) {
        sliderThumbnail = req.files["sliderThumbnail"][0];
      }
      let filmSrc = "";
      if (req.files["filmSrc"]) {
        filmSrc = req.files["filmSrc"][0];
      } else {
        filmSrc = req.file;
      }
      const film = await Film.findById(id);
      if (!film) {
        return res.json({ message: "Фильм не найден", id: id });
      }
      if (!title) {
        return res.json({ message: "Название фильма не может быть пустым" });
      }
      if(!country){
        return res.json({ message: "Укажите страну" });
      }
      if (!category) {
        return res.json({
          message:
            "Категории фильма не могут быть пустыми не может быть пустым",
        });
      }
      if (!description) {
        return res.json({
          message: "Описание фильма не может быть пустым",
        });
      }
      if (!date) {
        return res.json({
          message: "Дата выхода фильма не может быть пустой",
        });
      }
      if (
        isSlider == "true" &&
        film.sliderThumbnail == "/assets/img/login/watch.png" &&
        sliderThumbnail.path == "/assets/img/login/watch.png"
      ) {
        return res
          .status(500)
          .json({ message: "Вы не указали изображение в слайдер" });
      }
      film.isSlider = isSlider;
      film.category = currentCategory;
      film.description = description;
      film.title = title;
      film.date = date;
      film.actors = actors;
      film.trailer = trailer;
      film.country = country;
      if (filmSrc) {
        film.filmSrc = filmSrc.path;
      }
      if (sliderThumbnail.path !== "/assets/img/login/watch.png") {
        film.sliderThumbnail = sliderThumbnail.path;
      }
      if (thumbnail) {
        film.thumbnail = thumbnail.path;
      }
      await film.save();
      return res.json({ message: "Фильм изменен", film });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Ошибка при изменении фильма" });
    }
  }
  async addFavorites(req, res) {
    try {
      const { id, filmId } = req.body;
      const user = await User.findById(id);
      const foundFilm = user.favorites.find((film) => film == filmId);
      if (foundFilm) {
        return res.status(200).json({ message: "Фильм уже добавлен" });
      }
      user.favorites.push(filmId);
      await user.save();
      return res.status(200).json({ message: "Успешно добавлено", user: user });
    } catch (e) {
      res
        .status(503)
        .json({ message: "Ошибка при добавлении в избранное", error: e });
    }
  }
  async getFavorites(req, res) {
    try {
      const { id } = req.body;
      const user = await User.findById(id);
      if (!user) {
        return res.json({ message: "Пользователь не найден" });
      }
      if (!user.favorites) {
        return res.json({ message: "Вы еще не добавили фильмов в избранное" });
      }
      const filmArray = user.favorites;
      return res.json(filmArray);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Ошибка при получении фильмов" });
    }
  }
  async delFavorites(req, res) {
    try {
      const { id, filmId } = req.body;
      const film = await Film.findById(filmId);
      const user = await User.findById(id);
      if (!user || !film) {
        return;
      }
      const currentFilm = user.favorites.indexOf(filmId);
      if (currentFilm == -1) {
        return;
      }
      user.favorites.splice(currentFilm, 1);
      await user.save();
      return res
        .status(200)
        .json({ message: "Фильм успешно удален из избранного" });
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ message: "Ошибка при удалении фильма из избранного" });
    }
  }
}
module.exports = new movieController();
