const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true } );
client.connect(function(err) {
	console.log('Connected successfully to server');
});
module.exports = client;