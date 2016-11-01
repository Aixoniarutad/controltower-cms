var mongoose = require('mongoose');
var Module = require('./module');

var PageSchema = new mongoose.Schema({
    deleteable: {type: Boolean, default: true},
    filename: {type: String, default: 'default.html'},
    meta: {
    	title: {type: String, default: 'New Page'},
    	description: {type: String, default: 'A well formed page description.'},
    	keywords: {type: Array, default: ['One', 'Two', 'Three']}
    },
    modules: [Module.schema]
});
PageSchema.methods.cleanFilename = function(){
    if(this.deleteable)
        return this.filename = this.meta.title.replace(/[^a-z0-9_\-]/gi, '-').toLowerCase()+'.html';
}

var Page = mongoose.model('Page', PageSchema);
module.exports = Page;