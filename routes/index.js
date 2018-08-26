const express = require('express');
const router = express.Router();
const git = require('simple-git')(require('path').resolve('./'))

router.get('/', function(req, res, next) {

    res.render('index', { title: 'Guilherme Git' });

});

router.get('/diff', function(req, res, next) {

    git.diff((err, diff) => {
        res.send(diff);
    })
});

module.exports = router;
