var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./../models/user');
var Application = require('./../models/application');
var gcloud = require('gcloud')({
	projectId: 'controltower-cms'
});
var gcs = gcloud.storage();

router.get('/', 
	function(req, res, next){
		if(!req.isAuthenticated())
			return res.send({error: 'Session expired.'});
		Application.findById(req.user.config.APPLICATION_ID, function(err, application){
			if(err) return res.send({error: err.message});
			return res.send({application: application});
		});
	}
);
router.get('/session', 
	function(req, res, next){
		if(!req.isAuthenticated())
			return res.send({error: 'Session expired.'});
		return res.send({user: req.user});
	}
);
router.post('/logout', 
	function(req, res, next){
		req.session.destroy(function(err){
			res.writeHead(200);
			return res.end();
		});
	}
);
router.post('/login', 
	function(req, res, next){
		passport.authenticate('local-login', function(err, user, info){
			if(err) return res.send({error: err.message});
			if(info) return res.send({error: info.message});
			req.login(user, function(err){
				if(err) return res.send({error: err.message});
				return res.send({user: user});
			});
		})(req, res, next);
	}
);
router.post('/signup', 
	function(req, res, next){
		passport.authenticate('local-signup', function(err, user, info){
			if(err) return res.send({error: err.message});
			if(info) return res.send({error: info.message});
			req.login(user, function(err){
				if(err) return res.send({error: err.message});
				return res.send({user: user});
			});
		})(req, res, next);
	}
);
router.post('/initialize', 
	User.session, 
	function(req, res, next){
		Application.findOne({'config.APPLICATION_ID': req.user.config.APPLICATION_ID}, function(err, application){
			if(err) return res.send({error: err.message});
			if(application) return res.send({application: application});

			var newApplication = Application.generate({type: 'default', data: req.body});
			newApplication.config.ADMIN_EMAIL = req.user.local.username;
			newApplication.config.APPLICATION_ID = newApplication._id;
			newApplication.config.APPLICATION_URI = 'controltower-client-'+newApplication._id;
			newApplication.users = [req.user];
			newApplication.save(function(err, application){
				if(err) return res.send({error: err.message});

				// Make Bucket
				gcs.createBucket(application.config.APPLICATION_URI, function(err, bucket){
					if(err) return res.send({error: err.message});

					bucket.makePublic({includeFiles: true, force: true}, function(err, files){
						if(err) return res.send({error: err.message});

						User.findById(req.user._id, function(err, user){
							if(err) return res.send({error: err.message});
							user.config.APPLICATION_ID = application._id;
							user.config.ROLE = 'administrator';
							user.save(function(err, user){
								return res.send({user: user});
							});
						});
					});
				});
			});
		}); 
	}
);

module.exports = router;