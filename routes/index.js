const express = require('express');
const router = express.Router();

require('dotenv').config()

//Rota para renderizar a view
router.get('/', function(req, res, next) {

    let includeRepo = process.env.INCLUDE_REPO.split(',')
    res.render('index', { title: 'Cplug Git', repositories: includeRepo });

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

        let command = 'php ~/.composer/composer.phar dumpautoload -d ' + process.env.REPOSITORIES_PATH + repo

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
