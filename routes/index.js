const express = require('express');
const router = express.Router();
const fs = require('fs')

require('dotenv').config()

router.get('/', function(req, res, next) {

    let repositories = []

    fs.readdir(process.env.REPOSITORIES_PATH, function(err, items) {
     
        repositories = items
        
    });

    console.log(respositories)

    res.render('index', { title: 'Cplug Git', repositories: repositories });

});

router.post('/diff', function(req, res, next) {

    let repo = req.body.repo

    require('simple-git')('/var/www/' + repo).diff((err, diff) => {
        res.send(diff);
    })
});

module.exports = router;
