const express = require('express');
const router = express.Router();
const git = require('simple-git')(require('path').resolve('./'))

router.get('/', function(req, res, next) {

    git.status((err, status) => {
        res.render('index', { title: 'Guilherme Git', status: status });
    })
});

router.get('/file', function(req, res, next) {

    git.diff((err, diff) => {
        res.send(diff);
    })
});

module.exports = router;
