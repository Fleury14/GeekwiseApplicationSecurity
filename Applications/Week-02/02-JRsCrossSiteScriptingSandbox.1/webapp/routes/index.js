var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let data = await db.get();
  if(data) {
    console.log(data);
    res.render('index', Object.assign({ title: 'XSS Sandbox' }, data));
  } else {
    console.log('no data found');
    res.render('index', { title: 'XSS Sandbox', content: '<h1>Hi!</h1>', attribute: 'my-id', css: 'pink', javascript: "console.log('hello')"});
  }
  res.render('index', { title: 'Express' });
});

router.post('/', async function(req, res, next) {
  console.log('save', req.body);
  try {
    let data = await db.upsert(req.body);
    if (data) {
      console.log(data);
      res.render('index', Object.assign({ title: 'XSS Sandbox' }, data));
    } else {
      console.log('no data found');
      res.render('index', { title: 'XSS Sandbox', content: '<h1>Hi!</h1>', attribute: 'my-id', css: 'pink', javascript: "console.log('hello')"});
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
