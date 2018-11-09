const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
	constructor(title, price, imageUrl, description, id, userId) {
		this.title = title;
		this.price = price;
		this.imageUrl = imageUrl;
		this.description = description;
		this._id = id;
		this.userId = userId;
	}
	save() {
		const db = getDb();
		let dbOp; //db operation
		if (this._id) {
			dbOp = db
				.collection("products")
				.updateOne({ _id: new mongodb.ObjectID(this._id) }, { $set: this });
		} else {
			dbOp = db.collection("products").insertOne(this);
		}
		return dbOp
			.then(result => console.log(result))
			.catch(err => console.log(err));
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection("products")
			.find()
			.toArray()
			.then(products => products)
			.catch(err => console.log(err));
	}

	static findById(id) {
		const db = getDb();
		return db
			.collection("products")
			.find({ _id: new mongodb.ObjectId(id) })
			.next()
			.then(product => {
				console.log(product);
				return product;
			})
			.catch(err => console.log(err));
	}

	static deleteById(id) {
		const db = getDb();
		return db
			.collection("products")
			.deleteOne({ _id: new mongodb.ObjectId(id) })
			.then(product => {
				console.log(product);
				return product;
			})
			.catch(err => console.log(err));
	}
}

module.exports = Product;
