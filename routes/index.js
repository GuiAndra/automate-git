const express = require('express');
const router = express.Router();
const git = require('simple-git')(require('path').resolve('./'))

/* GET home page. */
router.get('/', function(req, res, next) {

    git.status((err, status) => {
        res.render('index', { title: 'Automate Git', status: status });
    })
});

router.post('/file', function(req, res, next) {

    let file = req.body.file

    git.diff(['--', file], (err, diff) => {
        res.send(diff);
    })
});

module.exports = router;
