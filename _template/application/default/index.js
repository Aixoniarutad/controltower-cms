var mongoose = require('mongoose');
var Application = require('./../../../models/application');
var Page = require('./../../../models/page');
var Module = require('./../../../models/module');
var Media = require('./../../../models/media');

module.exports = function(config){
    var newApplication = new Application({
        meta: config.meta,
        users: [],
        media: [new Media({
            name: 'logo.png', 
            publicUrl: 'https://storage.googleapis.com/controltower-files-release/assets/images/logo.png', 
            src: 'https://storage.googleapis.com/controltower-files-release/assets/images/logo.png'
        })],
        pages: [new Page({
            deleteable: false,
            filename: 'index.html',
            meta: {
                title: 'Home',
                description: 'My first landing page.',
                keywords: ['one', 'two', 'three']
            },
            modules: [
                Module.generate({type:'header'}),
                Module.generate({type:'splash'}),
                Module.generate({type:'text'}),
                Module.generate({type:'footer'})
            ]
        }),
        new Page({
            deleteable: true,
            filename: 'contact.html',
            meta: {
                title: 'Contact Us',
                description: 'Contact Us.',
                keywords: ['Contact Us']
            },
            modules: [
                Module.generate({type:'header'}),
                Module.generate({type:'contact'}),
                Module.generate({type:'text'}),
                Module.generate({type:'footer'})
            ]
        })]
    });
    return newApplication;
};