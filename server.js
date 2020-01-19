require('dotenv').config();  
const express = require('express');
const HTTP_PORT = 8081;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require("http");
const stripe = require('stripe')('sk_test_6pRsYNkfKnPrq1U2srx4HIRc00Z9xbhLde');
const payment = require('./src/backend/Utils/payment')
const storage = require('./src/backend/Utils/storage')
require('dotenv').config();  
app.listen(process.env.PORT || HTTP_PORT, () => {
    console.log("API listening on: " + HTTP_PORT);
})

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/*app.post("/charge", (req, res) => {
    payment.createCustomer(req.body)
    .then(
    const token = req.body.stripeToken; // Using Express
        const charge = stripe.charges.create({
        amount: 999,
        currency: 'cad',
        description: 'Example charge',
        source: token,
        }).then(data => {
            console.log(data);
        });
});*/

// Verified, works
app.get('/images', async (req, res) => {
    const results = await storage.findAll();
    res.json(results);
})

// Verified, works
app.get('/images/:title', async (req, res) => {
    const result = await storage.findImageByTitle(req.params.title)
    res.json(result);
})

// No tags will send empty
app.get('/images', async (req, res) => {
    if (req.query.tags.length === 0){
        res.send('No tags');
    }
    const tags = JSON.parse(req.query.tags);
    const results = await storage.findImageByTags(tags);
    res.json(results);
})

// Verified works
app.post('/images/addImage', async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.send("Error");
        res.status(406).send('Image info is required');
    }
    storage.addImage(req.body);
    res.send(`Successfully added image ${req.body.title}`);
})

// Verified works
app.put('/images/update/:title', async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.send("Error");
        res.status(406).send('Image info is required');
    }

    if (req.params.title && req.body.price) {
        storage.updateImagePrice(req.params.title, req.body.price);
        res.send(`Successfully updated price for image ${req.params.title} to ${req.body.price}`);
    }

    if (req.params.title && req.body.inventory) {
        storage.updateImageInventory(req.body.title, req.body.inventory);
        res.send(`Successfully updated inventory amount for image ${req.params.title} to ${req.body.inventory}`);
    }
})

// Remove Image
app.delete('/images/delete/:title', async (req, res) => {
    if (Object.keys(req.params).length === 0) {
        res.send("Error");
        res.status(406).send("Missing required info");
    }
    storage.removeImage(req.params.title);
    res.send(`Successfully removed image ${req.params.title}`);
})

// Get all orders
app.get('/order', async(req, res) => {
    if (Object.keys(req.body).length === 0) {
    }
});

// Verified Works
app.get('/shopping-cart', (req, res) => {
    res.json(payment.getShoppingCart());
})

// Verified Works
app.post('/shopping-cart', (req, res) => {
    payment.addToShoppingCart(req.body);
    res.send(`${req.body.title} added to cart`);
})

// Verified Works
app.get('/shopping-cart/checkout', (req, res) => {
    res.json(payment.createOrder());
})

// Verified Works
app.get('/shopping-cart/checkout/:ordernum', async (req,res) => {
    res.json(await payment.createPaymentIntent(req.params.ordernum));
})
