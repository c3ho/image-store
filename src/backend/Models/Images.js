const mongoose = require('mongoose')
require('dotenv').config();       

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    tags: [{type: String}],
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        enum: [0,1,2,3,4,5]
    },
    description: {
        type: String,
        required: true
    },
    inventory: {
        type: Number,
        required: true
    },
    private: {
        type: Boolean,
        default: true,
        required: true
    },
});
const Image = db.model("Images", imageSchema);
module.exports = Image;
