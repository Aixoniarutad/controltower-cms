var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./../models/user');
var Application = require('./../models/application');
var Module = require('./../models/module');

router.use(function(req, res, next){
    Application.findById(req.user.config.APPLICATION_ID, function(err, application){
        if(err) return res.send({error: err.message});
        return next();
    });
});
router.post('/create', 
    User.administrator, 
    function(req, res, next){
        Application.findById(req.user.config.APPLICATION_ID, function(err, application){
            var module = Module.generate(req.body.module);
            var page = application.pages.id(req.body.page._id);
                page.modules.push(module);
                
            application.save(function(err, application){
                return res.send({page: page});
            });
        });
    }
);
router.post('/update', 
    User.administrator, 
    function(req, res, next){
        Application.findById(req.user.config.APPLICATION_ID, function(err, application){
            var page = application.pages.id(req.body.page._id);
            var module = page.modules.id(req.body.module._id);
                module.set(req.body.module);
                
            application.save(function(err, application){
                return res.send({page: page});
            });
        });
    }
);
router.post('/copy', 
    User.administrator, 
    function(req, res, next){
        Application.findById(req.user.config.APPLICATION_ID, function(err, application){
            var page = application.pages.id(req.body.page._id);
            var module = new Module(req.body.module);
                module._id = mongoose.Types.ObjectId();
                page.modules.push(module);
                
            application.save(function(err, application){
                return res.send({page: page});
            });
        });
    }
);
router.post('/delete', 
    User.administrator, 
    function(req, res, next){
        Application.findById(req.user.config.APPLICATION_ID, function(err, application){
            var page = application.pages.id(req.body.page._id);
                page.modules.remove(req.body.module._id);
                
            application.save(function(err, application){
                return res.send({page: page});
            });
        });
    }
);
router.post('/sort', 
    User.administrator, 
    function(req, res, next){
        Application.findById(req.user.config.APPLICATION_ID, function(err, application){
            var page = application.pages.id(req.body.page._id);
                page.modules = req.body.modules;
                
            application.save(function(err, application){
                return res.send({page: page});
            });
        });
    }
);

module.exports = router;
