const BlogController = require('./blog.controller');
const UserController = require('./user.controller');
const express = require('express');
const router = express.Router();

const carController = new BlogController(router);
const userController = new UserController(router);

module.exports = router;