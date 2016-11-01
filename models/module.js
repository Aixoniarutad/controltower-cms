var mongoose = require('mongoose');

var ModuleSchema = new mongoose.Schema({
	type: String,
	template: {type: String, default: 'template.html'},
	order: {type: Number, default: 8},
    deleteable: {type: Boolean, default: true},
    style: {},
    data: {}
});

ModuleSchema.statics.generate = function(config){
	var module = require('./../_template/module/'+config.type+'/model');
	var object = new module(config);
	return object;
}

var Module = mongoose.model('Module', ModuleSchema);
module.exports = Module;