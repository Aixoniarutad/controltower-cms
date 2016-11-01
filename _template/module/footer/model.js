var mongoose = require('mongoose');
var Module = require('./../../../models/module');

var FooterSchema = new mongoose.Schema({
	order: {type: Number, default: 10},
	type: {type: String, default: "footer"},
	deleteable: {type: Boolean, default: true},
	template: {type: String, default: "template.html"},
	icon: {type: String, default: "subtitles"},
	style: {
		background_color: {type: String, default: "grey-dark"},
        text_align: {type: String, default: "text-align-left"}
	},
	data: {
		copyright: {type: String, default: "© MyBusiness"},
		social: {type: Array, default: [
			{"type": "facebook", "url":"http://www.facebook.com/"},
			{"type": "google", "url":"http://www.google.com/"},
			{"type": "twitter", "url":"http://www.twitter.com/"}
		]}
	}
});

var Footer = Module.discriminator('Footer', FooterSchema);
module.exports = Footer;