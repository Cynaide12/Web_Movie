const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const authRouter = require("../src/router/authRouter");
const movieRouter = require("../src/router/movieRouter");
const app = express();

if (process.env.NODE_ENV === "development") {
  console.log("in development.");
} else {
  console.log("in production.");
}

/* App Config */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.json()); //parsing JSON
app.use("/auth", authRouter);
app.use("/movie", movieRouter);
app.use("/storage", express.static(path.join(__dirname, "../src/storage")));
app.use(
  "/assets/img/card",
  express.static(path.resolve(__dirname, "../src/assets/img/card"), {
    extensions: ["jpg", "jpeg", "png", "webp", "svg"],
  })
);
app.use(
  "/assets/img/home",
  express.static(path.resolve(__dirname, "../src/assets/img/cover"), {
    extensions: ["jpg", "jpeg", "png", "webp", "svg"],
  })
);

/* Server Initialization */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});
// app.use(express.static(path.resolve(__dirname, "../src/assets/card")))
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    res.status(500).json({ error: "Something went wrong" });
  } else {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
var port = process.env.PORT || 3000;
const start = async () => {
  try {
    await mongoose.connect(
      `confidentially`
    );
    app.listen(port, () =>
      console.log(
        `Server initialized on: http://localhost:${port} // ${new Date()}`
      )
    );
  } catch (e) {
    console.log(e);
  }
};
start();
