var express = require('express');
var router = express.Router();
var async = require('async');
var NodeZip = require('node-zip');
var tmp = require('tmp');
var fs = require('fs-extra');
var Application = require('./../models/application');
var User = require('./../models/user');
var Page = require('./../models/page');
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
			return res.send({application: application});
		});
	}
);
router.post('/update', 
	User.administrator, 
	function(req, res, next){
		Application.findById(req.user.config.APPLICATION_ID, function(err, application){
			if(err) return res.send({error: err.message});
			application.meta = req.body.meta;
			application.save(function(err, application){
				if(err) return res.send({error: err.message});
				return res.send({application: application});
			});
		}); 
	}
);
router.post('/delete', 
	User.administrator,
	Application.removeBucket, 
	Application.removeUsers, 
	function(req, res, next){
		Application.findById(req.user.config.APPLICATION_ID, function(err, application){
			if(err) return res.send({error: err.message});

			application.remove(function(err, application){
				if(err) return res.send({error: err.message});

				req.session.destroy(function(err){
					if(err) return res.send({error: err.message});
					return res.send({application: null});
				});
			});
		});
	}
);
router.post('/download', 
	User.administrator, 
	function(req, res, next){
		Application.findById(req.user.config.APPLICATION_ID, function(err, application){
			if(err) return res.send({error: err.message});

			var tmpFile = tmp.fileSync({prefix: 'application-', postfix: '.zip'});
			var bucket = gcs.bucket(application.config.APPLICATION_URI);
			var zipped = new NodeZip;
			var options = {base64: false, compression:'DEFLATE'};

			async.each(application.pages, function(page, callback){
				page.modules.sort(function(a, b){
					return parseFloat(a.order) - parseFloat(b.order);
				});
				res.render('../_template/page/preview.ejs', {Application: application, Page: page}, function(err, html){
					if(err) callback(err);
					zipped.file(page.filename, html);
					callback();
				});
			}, function(err){
				if(err) return res.send({error: err.message});

				fs.writeFile(tmpFile.name, zipped.generate(options), 'binary', function(err){
					if(err) return res.send({error: err.message});

					bucket.upload(tmpFile.name, function(err, file){
						tmpFile.removeCallback();
						return res.send({zipfile: file.metadata.mediaLink});
					});
				});
			});
		}); 
	}
);

module.exports = router;