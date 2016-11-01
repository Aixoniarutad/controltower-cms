var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
    config: {
        APPLICATION_ID: mongoose.Schema.ObjectId,
        ROLE: {type: String, default: 'author'}
    },
    local: {
        username: {type: String, unique: true},
        password: {type: String},
    }
});
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
UserSchema.statics.session = function(req, res, next){
    if(!req.user || !req.isAuthenticated())
        return res.send({error: 'Session expired.'});
    return next();
};
UserSchema.statics.administrator = function(req, res, next){
    User.findById(req.user._id, function(err, user){
        if(err) return res.send({error: err.message});
        if(user.config.ROLE!=='administrator') return res.send({error: 'You do not have permission.'});
        return next();
    });
};

var User = mongoose.model('User', UserSchema);
module.exports = User;