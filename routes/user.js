var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./../models/user');
var Application = require('./../models/application');

router.use(function(req, res, next){
    Application.findById(req.user.config.APPLICATION_ID, function(err, application){
        if(err) return res.send({error: err.message});
        return next();
    });
});
router.get('/', function(req, res, next){
    Application.findById(req.user.config.APPLICATION_ID, function(err, application){
        if(err) return res.send({error: err.message});
        return res.send({users: application.users});
    });
});
router.post('/create', User.administrator, function(req, res, next){
    Application.findById(req.user.config.APPLICATION_ID, function(err, application){
        passport.authenticate('application-signup', function(err, user, info){
            if(err) return res.send({error: err.message});
            if(info) return res.send({error: info.message});
            application.users.push(user);
            application.save(function(err, application){
                if(err) return res.send({error: err.message});
                return res.send({users: application.users});
            });
        })(req, res, next);
    });
});
router.post('/update', User.administrator, function(req, res, next){
    Application.findById(req.user.config.APPLICATION_ID, function(err, application){
        if(err) return res.send({error: err.message});

        var user = application.users.id(req.body._id);
            user.set(req.body);
        application.save(function(err, application){
            if(err) return res.send({error: err.message});
            return res.send({users: application.users});
        });
    });
});
router.post('/delete', User.administrator, function(req, res, next){
    Application.findById(req.user.config.APPLICATION_ID, function(err, application){
        if(err) return res.send({error: err.message});

        User.find({_id: {$in: req.body}}, function(err, users){
            users.forEach(function(user){
                if(user.config.ROLE!=='administrator'){
                    user.remove();
                    application.users.id(user._id).remove();
                }
            });
            application.save(function(err, application){
                if(err) return res.send({error: err.message});
                return res.send({users: application.users});
            });
        });
    });
});

module.exports = router;