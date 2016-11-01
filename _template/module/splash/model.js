var mongoose = require('mongoose');
var Module = require('./../../../models/module');

var SplashSchema = new mongoose.Schema({
    type: {type: String, default: "splash"},
    template: {type: String, default: "template.html"},
    order: {type: Number, default: 1},
    deleteable: {type: Boolean, default: true},
    icon: {type: String, default: "stars"},
    style: {
        background_color: {type: String, default: "white"},
        background_image: {type: String, default: "https://storage.googleapis.com/controltower-files-release/assets/images/tiger.jpg"},
        text_align: {type: String, default: "text-align-left"},
        layout_align: {type: String, default: "start"}
    },
    data: {
    	title: {type: String, default: "Title"},
    	subtitle: {type: String, default: "subtitle"}
    }
});

var Splash = Module.discriminator('Splash', SplashSchema);
module.exports = Splash;