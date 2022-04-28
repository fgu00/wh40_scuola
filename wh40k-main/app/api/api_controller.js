const mysql = require("mysql");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  con.connect(function (err) {
    if (err) {
      console.log("DATABASE CONNECTION: ERR");
      throw err;
    } else {
      console.log("DATABASE CONNECTION: OK");
    }
  });

  /* 2FA */

  module.exports.addOTP = function (id, secret, callback) {
    con.query('INSERT INTO `2fa` (id_utente, secret) VALUES (?, ?);', [id, secret], callback);
  };

  module.exports.verifyOTP = function (id, callback) {
    con.query('SELECT `secret` FROM `2fa` WHERE id_utente = ?', [id], callback);
  };

  /* END 2FA */

  /* USER */

  module.exports.loginUser = function (username, password, callback) {
    con.query('SELECT * FROM `user` WHERE username = ? AND password = ?;', [username, password], callback);
  };

  module.exports.getUserById = function (id, callback) {
    con.query('SELECT * FROM `user` WHERE id = ?;', [id], callback);
  };

  module.exports.getUserByUsername = function (username, callback) {
    con.query('SELECT * FROM `user` WHERE username = ?;', [username], callback);
  };

  module.exports.signUpUser= function (username, password, callback) {
    con.query('INSERT INTO `user` (username, password) VALUES (?, ?);', [username, password], callback);
  };

  module.exports.UpdatePwdUser = function (id, password) {
    con.query('UPDATE `user` SET password = ? WHERE id= ?;', [password, id]);
  };

  /* END USER */