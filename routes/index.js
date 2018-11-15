const express = require('express');
const router = express.Router();

require('dotenv').config()

//Rota para renderizar a view
router.get('/', function(req, res, next) {

    let selectedRepo = req.query.repo

    let includeRepo = process.env.INCLUDE_REPO.split(',')
    res.render('index', { title: 'Cplug Git', repositories: includeRepo, selectedRepo: selectedRepo });

});

//Retorna status de um repositório
//param repo string
router.post('/status', function(req, res, next) {

    let repo = req.body.repo

    console.log(process.env.REPOSITORIES_PATH + repo)

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

router.post('/restart-gulp', function(req, res, next) {

    let repo = req.body.repo

    let includeRepo = process.env.INCLUDE_REPO.split(',')

    //Repositórios sem permissão
    if(! includeRepo.includes(repo)){

        res.status(401).send('Unauthorized!');

    } else {
        
        let exec = require('child_process').exec;

        //verifica se já existe um processo rodando
        let checkAndKillCommand = "ps -aux | grep -v 'auto' | grep 'cd " + process.env.REPOSITORIES_PATH + repo + "; gulp watch' | cut -f 5 -d' ' | xargs kill"
        const execCheckAndKill = exec(checkAndKillCommand);

        execCheckAndKill.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);

            //Comando para iniciar o gulp watch
            const ls = exec('cd /var/www/' + repo + '; gulp watch');                    
        });
            
        execCheckAndKill.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });
            
        execCheckAndKill.on('close', (code) => {

            console.log(`child process exited with code ${code}`);

            //Comando para iniciar o gulp watch
            const ls = exec('cd ' + process.env.REPOSITORIES_PATH + repo + '; gulp watch');
        });        

        res.send(['Ok'])
    }
});

router.post('/execute-gulp', function(req, res, next) {

    let repo = req.body.repo

    let includeRepo = process.env.INCLUDE_REPO.split(',')

    //Repositórios sem permissão
    if(! includeRepo.includes(repo)){

        res.status(401).send('Unauthorized!');

    } else {
        
        let exec = require('child_process').exec;

        //verifica se já existe um processo rodando
        let checkAndKillCommand = "ps -aux | grep -v 'auto' | grep 'cd '" + process.env.REPOSITORIES_PATH + repo + "; gulp watch' | cut -f 5 -d' ' | xargs kill"
        const execCheckAndKill = exec(checkAndKillCommand);
            
        execCheckAndKill.on('close', (code) => {

            console.log(`child process exited with code ${code}`);

            //Comando para iniciar o gulp watch
            exec('cd /var/www/' + repo + '; gulp', function(error, stdout, stderr){
                res.send([stdout])
            });      
        });        
    }
});


//executa comando php artisan dumpautoload no repositorio
//param repo string
router.post('/phpunit', function(req, res, next) {

    let repo = req.body.repo

    let includeRepo = process.env.INCLUDE_REPO.split(',')

    //Repositórios sem permissão
    if(! includeRepo.includes(repo)){

        res.status(401).send('Unauthorized!');

    } else {

        let exec = require('child_process').exec;

        let command = 'cd ' + process.env.REPOSITORIES_PATH + repo + '; vendor/bin/phpunit'

        exec(command, function(error, stdout, stderr){
            res.send([stdout, stderr]);
        });

    }
});

module.exports = router;
