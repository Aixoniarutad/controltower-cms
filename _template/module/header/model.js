var mongoose = require('mongoose');
var Module = require('./../../../models/module');

var HeaderSchema = new mongoose.Schema({
    type: {type: String, default: 'header'},
    template: {type: String, default: 'template.html'},
    order: {type: Number, default: 0},
    deleteable: {type: Boolean, default: false},
    icon: {type: String, default: 'menu'},
    style: {
        background_color: {type: String, default: 'white'},
        layout: {type: String, default: 'row'},
        layout_align: {type: String, default: ''},
        flex: {type: String, default: '90'},
        flex_offset:{type: String, default: '5'},
        text_align: {type: String, default: 'left'}
    },
    data: {
    	logo: {type: String, default: 'https://storage.googleapis.com/controltower-files-release/assets/images/logo.png'}
    }
});

var Header = Module.discriminator('Header', HeaderSchema);
module.exports = Header;