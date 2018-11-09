const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
	constructor(username, email, cart, id) {
		this.username = username;
		this.email = email;
		this.cart = cart;
		this._id = id;
	}

	save() {
		const db = getDb();
		return db.insertOne(this);
	}

	addToCart(product) {
		const cartProductIndex = this.cart.items.findIndex(cp => {
			return cp.productId.toString() === product._id.toString();
		});
		let newQuantity = 1;
		const updatedCartItems = [...this.cart.items];
		if (cartProductIndex >= 0) {
			newQuantity = this.cart.items[cartProductIndex].quantity + 1;
			updatedCartItems[cartProductIndex].quantity = newQuantity;
		} else {
			updatedCartItems.push({
				productId: new mongodb.ObjectId(product._id),
				quantity: newQuantity
			});
		}
		const updataCart = {
			items: updatedCartItems
		};
		const db = getDb();
		return db
			.collection("users")
			.updateOne(
				{ _id: new mongodb.ObjectId(this._id) },
				{ $set: { cart: updataCart } }
			);
	}

	static findById(id) {
		const db = getDb();
		return db.collection("users").findOne({ _id: new mongodb.ObjectId(id) });
	}
}

module.exports = User;
