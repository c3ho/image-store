const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    fullName: {
    type: String,
    required: true
    },
    email: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    images: [{type: String}],
});
const Order = db.model("Orders", orderSchema);
module.exports = Order;
