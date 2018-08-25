var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    let git = require('simple-git')

    let repo = git(require('path').resolve('../../laravel/secure-data'))

    repo.status((err, status) => {
        res.render('index', { title: 'Automate Git', status: status });
    })
});

router.post('/file', function(req, res, next) {

    let file = req.body.file
    
    let git = require('simple-git')

    let repo = git(require('path').resolve('../../laravel/secure-data'))

    repo.diff('-' + file,(err, diff) => {
        res.send(diff);
    })
});

module.exports = router;
