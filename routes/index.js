var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next){
    res.render('index.html');
});

router.get('/docs', function (req, res, next){
    res.render('docs/index.html');
});

module.exports = router;
