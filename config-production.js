'use strict';

// Hierarchical node.js configuration with command-line arguments, environment
// variables, and files.
var nconf = module.exports = require('nconf');
var path = require('path');

nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'GCLOUD_PROJECT',
    'GCLOUD_BUCKET',
    'DATA_BACKEND',
    'MEMCACHE_URL',
    'MONGO_URL',
    'NODE_ENV',
    'PORT',
    'SECRET'
  ])
  // 3. Config file
  .file({ file: path.join(__dirname, 'config.json') })
  // 4. Defaults
  .defaults({
    // This is the id of your project in the Google Cloud Developers Console.
    GCLOUD_PROJECT: 'XXXXXXXXXX-XXXXXXXXXX',
    GCLOUD_BUCKET: 'XXXXXXXXXX',
    DATA_BACKEND: 'mongodb',

    // Connection url for the Memcache instance used to store session data
    MEMCACHE_URL: '127.0.0.1:11211',

    // MongoDB connection string
    MONGO_URL: 'mongodb://<dbuser>:<dbpassword>@XXXXXXXXXX/XXXXXXXXXX',

    // Node Environment
    NODE_ENV: 'production',

    // Port the HTTP server
    PORT: 8080,
    SECRET: 'XXXXXXXXXX',
 });

// Check for required settings
checkConfig('GCLOUD_PROJECT');
checkConfig('GCLOUD_BUCKET');

if (nconf.get('DATA_BACKEND') === 'mongodb') {
    checkConfig('MONGO_URL');
}

function checkConfig (setting) {
    if (!nconf.get(setting)) {
        throw new Error('You must set the ' + setting + ' environment variable or' +
        ' add it to config.json!');
    }
}
