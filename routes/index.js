const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {

    res.render('index', { title: 'Cplug Git' });

});

router.post('/diff', function(req, res, next) {

    let repo = req.body.repo

    require('simple-git')('/var/www/' + repo).diff((err, diff) => {
        res.send(diff);
    })
});

module.exports = router;
