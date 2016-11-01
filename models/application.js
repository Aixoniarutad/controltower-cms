var mongoose = require('mongoose');
var User = require('./user');
var Page = require('./page');
var Media = require('./media');
var gcloud = require('gcloud')({
	projectId: 'controltower-cms'
});
var gcs = gcloud.storage();

var ApplicationSchema = new mongoose.Schema({
	config: {
		APPLICATION_ID: String,
		APPLICATION_URI: String,
		ADMIN_EMAIL: String,
	},
	meta: {
		title: {type: String, default: 'My Business'},
		description: {type: String, default: 'Passionate and experienced professionals'},
		logo: {type: String, default: 'logo.png'},
		email: {type: String, default: ''},
		telephone: {type: String, default: ''},
		address: {type: String, default: ''},
		city: {type: String, default: ''},
		state: {type: String, default: ''},
		zipcode: {type: String, default: ''},
		social: {type: Array, default: [
			{type:'facebook', src:'http://www.facebook.com/', icon:'images/social/facebook/facebook_36.png'},
			{type:'google', src:'http://www.google.com/', icon:'images/social/google/google_36.png'},
			{type:'twitter', src:'http://www.twitter.com/', icon:'images/social/twitter/twitter_36.png'}
		]}
	},
	users: [User.schema],
	media: [Media.schema],
	pages: [Page.schema]
});

ApplicationSchema.statics.generate = function(config){
	var application = require('./../_template/application/'+config.type+'/')(config.data);
	return application;
}
ApplicationSchema.statics.removeBucket = function(req, res, next){
	Application.findById(req.user.config.APPLICATION_ID, function(err, application){
		if(err) return res.send({error: err.message});
		var bucket = gcs.bucket(application.config.APPLICATION_URI);
		bucket.deleteFiles(function(err){
			if(err) return res.send({error: err.message});
			bucket.delete(function(err){
				if(err) return res.send({error: err.message});
				return next();
			});
		});
	});
}
ApplicationSchema.statics.removeUsers = function(req, res, next){
	User.remove({'config.APPLICATION_ID': req.user.config.APPLICATION_ID}, function(err, users){
		if(err) return res.send({error: err.message});
		return next();
	});
}

var Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;