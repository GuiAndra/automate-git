const express = require('express');
const router = express.Router();
const fs = require('fs')

require('dotenv').config()

//Rota para renderizar a view
router.get('/', function(req, res, next) {

    fs.readdir(process.env.REPOSITORIES_PATH, (err, items) => {
        
        let repositories = items

        let includeRepo = process.env.INCLUDE_REPO.split(',')

        for (i = 0; i < includeRepo.length; i++) {
            if(! repositories.indexOf(includeRepo[i])){
                let index = repositories.indexOf(includeRepo[i])
                repositories.splice(index, 1)
            }
        }

        res.render('index', { title: 'Cplug Git', repositories: repositories });

    });

});

//Retorna status de um repositório
//param repo string
router.post('/status', function(req, res, next) {

    let repo = req.body.repo

    let includeRepo = process.env.INCLUDE_REPO.split(',')

    //Repositórios sem permissão
    if(! includeRepo.includes(repo)){

        res.status(401).send('Unauthorized!');

    }else{

        require('simple-git')(process.env.REPOSITORIES_PATH + repo).status((err, status) => {
            res.send(status);
        })

    }
});

//Retorna diff de um repositório
//param repo string
router.post('/diff', function(req, res, next) {

    let repo = req.body.repo
    let file = ['--']

    if(req.body.file && req.body.file != 'all'){
        file.push(req.body.file)
    }

    let includeRepo = process.env.INCLUDE_REPO.split(',')

    //Repositórios sem permissão
    if(! includeRepo.includes(repo)){

        res.status(401).send('Unauthorized!');

    }else{

        require('simple-git')(process.env.REPOSITORIES_PATH + repo).diff(file,(err, diff) => {
            res.send(diff);
        })

    }
});

//executa comando php artisan dumpautoload no repositorio
//param repo string
router.post('/dumpautoload', function(req, res, next) {

    let repo = req.body.repo

    let includeRepo = process.env.INCLUDE_REPO.split(',')

    //Repositórios sem permissão
    if(! includeRepo.includes(repo)){

        res.status(401).send('Unauthorized!');

    }else{

        let exec = require('child_process').exec;

        let command = 'composer dumpautoload -d ' + process.env.REPOSITORIES_PATH + repo

        exec(command, function(error, stdout, stderr){
            res.send([stdout, stderr]);
        });

    }
});

//executa comando exec killall gulp; gulp;
//param repo string
router.post('/restart-gulp', function(req, res, next) {

    let repo = req.body.repo

    let includeRepo = process.env.INCLUDE_REPO.split(',')

    //Repositórios sem permissão
    if(! includeRepo.includes(repo)){

        res.status(401).send('Unauthorized!');

    }else{

        let exec = require('child_process').exec;

        let command = 'killall gulp; gulp;'

        exec(command, function(error, stdout, stderr){
            res.send([stdout,stderr]);
        });

    }
});

module.exports = router;
