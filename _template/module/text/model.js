var mongoose = require('mongoose');
var Module = require('./../../../models/module');

var TextSchema = new mongoose.Schema({
    type: {type: String, default: "text"},
    template: {type: String, default: "template.html"},
    order: {type: Number, default: 2},
    deleteable: {type: Boolean, default: true},
    icon: {type: String, default: "text_fields"},
    style: {
        background_color: {type: String, default: "white"},
        layout: {type: String, default: "row"},
        layout_align: {type: String, default: ""},
        flex: {type: String, default: "90"},
        flex_offset:{type: String, default: "5"},
        text_align: {type: String, default: "text-align-left"}
    },
    data: {
    	columns: {type: Array, default: [
            {   
                "visibility": true,
                "title": "Ready",
                "image": "logo.png",
                "paragraph": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel volutpat est. Vivamus pharetra leo nec libero bibendum interdum."
            },
            {
                "visibility": true,
                "title": "Set",
                "image": "logo.png",
                "paragraph": "Praesent venenatis neque congue velit dapibus finibus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
            },
            {
                "visibility": true,
                "title": "Go.",
                "image": "logo.png",
                "paragraph": "Aliquam volutpat ipsum odio, sit amet auctor magna malesuada at. Mauris sit amet nunc finibus, lobortis metus quis, fringilla mauris."
            },
        ]},
    }
});

var Text = Module.discriminator('Text', TextSchema);
module.exports = Text;