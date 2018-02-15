var express = require('express');
var router = express.Router();
var csurf = require('csurf');

var csrfProt = csurf({cookie: true});


/* GET home page. */
router.get('/', csrfProt, async function(req, res, next) {
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)

    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)

    // un-comment if you want to redirect from index if the user is logged in
    // if (req.cookies['realusername']) {
    //     console.log(`User ${req.cookies.realusername} found, redirecting to welcome...`);
    //     res.redirect(`/users/welcome?name=${req.cookies.realusername}`);
    // } else {
    //     res.render('index', {});
    // }
    
    res.render('index', { csrfToken: req.csrfToken() });
});

router.post('/', async function(req, res, next) {
    // todo - should try-catch here
    console.log("save", req.body);
    res.render('index', {});
});

module.exports = router;