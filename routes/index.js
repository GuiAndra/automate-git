const express = require('express');
const router = express.Router();
const fs = require('fs')

require('dotenv').config()

router.get('/', function(req, res, next) {

    fs.readdir(process.env.REPOSITORIES_PATH, (err, items) => {
        
        let repositories = items

        let excludeRrepo = process.env.EXCLUDE_REPO.split(',')

        for (i = 0; i < excludeRrepo.length; i++) {
            let index = repositories.indexOf(excludeRrepo[i])
            repositories.splice(index, 1)
        }

        // console.log(repositories)

        res.render('index', { title: 'Cplug Git', repositories: repositories });

    });

});

router.post('/diff', function(req, res, next) {

    let repo = req.body.repo

    let excludeRrepo = process.env.EXCLUDE_REPO.split(',')

    //Repositórios sem permissão
    if(excludeRrepo.includes(repo)){

        res.status(401).send('Unauthorized!');

    }else{

        require('simple-git')(process.env.REPOSITORIES_PATH + '/' + repo).diff((err, diff) => {
            res.send(diff);
        })

    }
});

router.post('/dumpautoload', function(req, res, next) {

    let repo = req.body.repo

    let excludeRrepo = process.env.EXCLUDE_REPO.split(',')

    //Repositórios sem permissão
    if(excludeRrepo.includes(repo)){

        res.status(401).send('Unauthorized!');

    }else{

        let exec = require('child_process').exec;

        let command = 'php ' + process.env.REPOSITORIES_PATH + '/' + repo + '/artisan dumpautoload'

        exec(command, function(error, stdout, stderr){
            res.send(stdout);
        });

    }
});

module.exports = router;
