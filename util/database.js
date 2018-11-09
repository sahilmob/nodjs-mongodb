const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
	MongoClient.connect(
		"mongodb+srv://sahil:EgmguZoNUpemFdsF@cluster0-ax6dp.mongodb.net/test?retryWrites=true",
		{ useNewUrlParser: true }
	)
		.then(result => {
			console.log("DB Connected");
			callback(result);
		})
		.catch(err => console.log(err));
};

module.exports = mongoConnect;
