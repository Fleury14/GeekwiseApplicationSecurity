var express = require('express');
var router = express.Router();

router.get('/401', async function(req, res, next) {
    res.render('fourOhOne', {});
})

module.exports = router;