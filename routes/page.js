var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var User = require('./../models/user');
var Application = require('./../models/application');
var Page = require('./../models/page');
var Module = require('./../models/module');

router.use(function(req, res, next){
    Application.findById(req.user.config.APPLICATION_ID, function(err, application){
        if(err) return res.send({error: err.message});
        return next();
    });
});
router.get('/', function (req, res, next){
    Application.findById(req.user.config.APPLICATION_ID, function(err, application){
        if(err) return res.send({error: err.message});
        return res.send({pages: application.pages});
    });
});
router.get('/:id', function (req, res, next){
    Application.findById(req.user.config.APPLICATION_ID, function(err, application){
        if(err) return res.send({error: err.message});
        var page = application.pages.id(req.params.id);
        return res.send({page: page});
    });
});
router.post('/create', User.administrator, function(req, res, next){
    Application.findById(req.user.config.APPLICATION_ID, function(err, application){
        if(application.pages.length >= 5)
            return res.send({error: 'You cannot have more than 5 pages!'});

        var module = Module.generate({type:'header'});
        var page = new Page(req.body);
            page.modules.push(module);
            page.cleanFilename();
            
        application.pages.push(page);
        application.save(function(err, application){
            if(err) return res.send({error: err.message});

            return res.send({pages: application.pages, page: page});
        });
    });
});
router.post('/update', User.administrator, function(req, res, next){
    Application.findById(req.user.config.APPLICATION_ID, function (err, application){
        var page = application.pages.id(req.body._id);
            page.meta = req.body.meta;

        if(page.deleteable)
            page.cleanFilename();

        application.save(function(err, application){
            if(err) return res.send({error: err.message});

            return res.send({pages: application.pages, page: page});
        });
    });
});
router.post('/delete', User.administrator, function (req, res, next){
    Application.findById(req.user.config.APPLICATION_ID, function (err, application){
        var page = application.pages.id(req.body._id);
        
        if(!page.deleteable)
            return res.send({error: 'You cannot delete this page!'});

        application.pages.remove(page._id);
        application.save(function(err, application){
            if(err) return res.send({error: err.message});

            return res.send({pages: application.pages});
        });
    });
});

module.exports = router;
