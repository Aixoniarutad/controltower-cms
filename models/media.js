var mongoose = require('mongoose');

var MediaSchema = new mongoose.Schema({
    publicUrl: String,
	kind: String,
    id: String,
    selfLink: String,
    name: String,
    bucket: String,
    generation: String,
    metageneration: String,
    contentType: String,
    timeCreated: String,
    updated: String,
    storageClass: String,
    size: String,
    md5Hash: String,
    mediaLink: String,
    crc32c: String,
    etag: String
});

var Media = mongoose.model('Media', MediaSchema);
module.exports = Media;