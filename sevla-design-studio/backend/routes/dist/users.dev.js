"use strict";

var router = require('express').Router();

var User = require('../models/user.models');

router.route('/').get(function (req, res) {
  User.find().then(function (users) {
    return res.json(users);
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/add').post(function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var newUser = new User({
    username: username,
    password: password
  });
  newUser.save().then(function () {
    return res.json('User added!');
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
module.exports = router;