const express = require('express');
const router = express.Router();
const git = require('simple-git')

router.get('/', function(req, res, next) {

    res.render('index', { title: 'Cplug Git' });

});

router.post('/diff', function(req, res, next) {

    let repo = req.body.repo

    git('/var/www/' + repo)

    git.diff((err, diff) => {
        res.send(diff);
    })
});

module.exports = router;
