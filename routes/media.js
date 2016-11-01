var express = require('express');
var router = express.Router();
var format = require('util').format;
var async = require('async');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var User = require('./../models/user');
var Application = require('./../models/application');
var Media = require('./../models/media');
var gcloud = require('gcloud')({
  	projectId: 'controltower-cms'
});
var gcs = gcloud.storage();

router.use(function(req, res, next){
	Application.findById(req.user.config.APPLICATION_ID, function(err, application){
		if(err) return res.send({error: err.message});
		return next();
	});
});
router.get('/', 
	function(req, res, next){
		Application.findById(req.user.config.APPLICATION_ID, function(err, application){
			if(err) return res.send({error: err.message});
			return res.send({media: application.media});
		});
	}
);
router.post('/upload', 
	User.administrator, 
	multipartyMiddleware, 
	function(req, res, next){
		if(!req.files.file) return res.status(400).send({error: err.message});

		Application.findById(req.user.config.APPLICATION_ID, function(err, application){
			var bucket = gcs.bucket(application.config.APPLICATION_URI);
			var originalFile = req.files.file;
			var options = {
				destination: 'uploads/'+originalFile.name,
				resumable: true,
				validation: 'crc32c',
				gzip: true
			};
			bucket.upload(originalFile.path, options, function(err, file){
				if(err) return res.send({error: err.message});

				var publicUrl = format('https://storage.googleapis.com/%s/%s', bucket.name, file.name);
				var media = new Media(file.metadata);
					media.publicUrl = publicUrl;
					media.name = originalFile.name;
				application.media.push(media);
				application.save(function(err, application){
					if(err) return res.send({error: err.message});
					return res.status(200).send({media: media});
				});
			});
		});
	}
);
router.post('/update', 
	User.administrator, 
	function(req, res, next){
	Application.findById(req.user.config.APPLICATION_ID, function(err, application){
			var file = application.media.id(req.body._id);
				file.set(req.body);
			application.save(function(err, application){
				if(err) return res.send({error: err.message});
				return res.send({media: application.media});
			});
		});
	}
);
router.post('/delete', 
	User.administrator, 
	function(req, res, next){
		Application.findById(req.user.config.APPLICATION_ID, function(err, application){
			var bucket = gcs.bucket(application.config.APPLICATION_URI);
			var files = req.body;

			async.eachSeries(files, function(file, callback){
				application.media.id(file._id).remove(function(err){
					if(err || !file.name)
						return callback(err);

					bucket.file(file.name).delete(function(err){
						callback();
					});
				});
			}, function(err){
				if(err) return res.send({error: err.message});
				application.save(function(err, application){
					if(err) return res.send({error: err.message});
					return res.send({media: application.media});
				});
			});
		});
	}
);

module.exports = router;
