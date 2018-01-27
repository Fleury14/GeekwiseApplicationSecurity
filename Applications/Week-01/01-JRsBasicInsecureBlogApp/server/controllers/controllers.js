const BlogController = require('./blog.controller');
const express = require('express');
const router = express.Router();

const carController = new BlogController(router);

module.exports = router;