var mongoose = require('mongoose');
var Module = require('./../../../models/module');

var ContactSchema = new mongoose.Schema({
	type: {type: String, default: 'contact'},
	template: {type: String, default: 'template.html'},
	order: {type: Number, default: 0},
	deleteable: {type: Boolean, default: true},
	icon: {type: String, default: 'email'},
	style: {
		background_color: {type: String, default: 'white'},
		layout: {type: String, default: 'row'},
		layout_align: {type: String, default: ''},
		flex: {type: String, default: '90'},
		flex_offset:{type: String, default: '5'},
		text_align: {type: String, default: 'left'}
	},
	data: {
		title: {type: String, default: 'Contact Us'},
		address: {type: String, default: '3422 Brookdale Ave.'},
		city: {type: String, default: 'Parma'},
		state: {type: String, default: 'Ohio'}
	}
});

var Contact = Module.discriminator('Contact', ContactSchema);
module.exports = Contact;