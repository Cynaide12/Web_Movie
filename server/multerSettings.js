const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, thumbnail, cb) => {
    cb(null, path.join(__dirname, "../src/assets/img/card"));
  },
  filename: (req, thumbnail, cb) => {
    const originalname = thumbnail.originalname;
    const files = fs.readdirSync(
      path.join(__dirname, "../src/assets/img/card")
    );
    function getExtension(filename) {
      var ext = path.extname(filename||'').split('.');
      return ext[ext.length - 1];
  }
    const existingFile = files.find((file) => {
      const stats = fs.statSync(
        path.join(__dirname, "../src/assets/img/card", file)
      );
      if (file.includes(originalname)) {
        return true;
      }
      else{
      return false;}
    });
    const allowedExtensions = ['jpg', 'png', 'svg', 'webp', 'jpeg', 'mp4', 'mov', 'www', 'avi', 'flv'];
    const ext = getExtension(originalname);
    if(allowedExtensions.includes(ext)){
    if (existingFile) {
      cb(null, existingFile);
    } else {
      cb(null, Date.now() + "-" + thumbnail.originalname);
    }}else{
      cb(new Error("Неподдерживаемый формат"))
    }
  },
});

module.exports = storage;
