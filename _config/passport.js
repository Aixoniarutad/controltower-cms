var LocalStrategy = require('passport-local').Strategy;
var User = require('./../models/user');

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    }, function(req, username, password, done){
        process.nextTick(function(){
            User.findOne({'local.username': username}, function(err, user){
                if(err)
                    return done(err);
                if(user)
                    return done(null, false, {message: 'This user already exists'});

                var newUser = new User();
                newUser.local.username = username;
                newUser.local.password = newUser.generateHash(password);
                newUser.config.ROLE = 'administrator';
                newUser.save(function(err){
                    if(err) return done(err);
                    return done(null, newUser);
                });
            });    
        });
    }));
    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    }, function(req, username, password, done){
        process.nextTick(function(){
            User.findOne({'local.username': username}, function(err, user){
                if(err)
                    return done(err);
                if(!user)
                    return done(null, false, {message: 'User not found.'});
                if(!user.validPassword(password))
                    return done(null, false, {message: 'Incorrect password.'});
                return done(null, user);
            });
        });
    }));
    passport.use('application-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    }, function(req, username, password, done){
        process.nextTick(function(){
            User.findOne({'local.username': username}, function(err, user){
                if(err)
                    return done(err);
                if(user)
                    return done(null, false, {message: 'This user already exists'});

                var newUser = new User();
                newUser.local.username = username;
                newUser.local.password = newUser.generateHash(password);
                newUser.config.APPLICATION_ID = req.user.config.APPLICATION_ID;
                newUser.config.ROLE = 'author';
                newUser.save(function(err){
                    if(err) return done(err);
                    return done(null, newUser);
                });
            });    
        });
    }));
};
