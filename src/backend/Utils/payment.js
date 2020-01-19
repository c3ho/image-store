//const mongoose = require('mongoose');
const Image = require('../Models/Order');
const stripe = require('stripe')(process.env.SK_TEST_KEY);
let orderNum = 0;
const post = {
    title: 'A Picture of a Goose',
    price: 1.50,
}
let shoppingCart = [];
shoppingCart.push(post);
let orders = [];

module.exports = {
    // Creates a payment intent, this works for card holders outside of NA
    // Not exploring HST/VAT here yet.
    // Amount has to be multipled by 100 because it uses the lowest currency. amount: 1 = 1 cent.
    createPaymentIntent: async (orderNum) => {
        return await stripe.paymentIntents.create({
            amount: orders[orderNum].amount * 100,
            currency: 'cad',
            payment_method_types: ['card'],
            statement_descriptor: `Image store order`
        })
    },

    // We will assume orderInfo is an object that contains multiple images
    // will retun an order object
    createOrder: (discount) => {
        if (!discount) {
            discount = 0;
        }
        const total = shoppingCart.reduce((accumulator, imageObj) => {
            return accumulator + imageObj.price; }, 0) * (1 - (discount/100));

        const imagesOrdered = shoppingCart.map(image => image.title);
        const order = {
            orderId: orderNum,
            amount: total,
            imagesOrdered: imagesOrdered
        }
        orders.push(order);
        return orders[orderNum++];
    },

    // Clears all image objects in the current shopping cart
    clearSelected: () => {
        shoppingCart = [];
        console.log(`Cleared shopping cart ${shoppingCart.length}`);
    },

    // Add image object to shopping cart
    addToShoppingCart: (image) => {
        shoppingCart.push(image);
        console.log(`There are ${shoppingCart.length} items in the cart`);
        return shoppingCart;
    },

    // Return shopping cart
    getShoppingCart: () => {
        return shoppingCart;
    },

    // Returns all orders
    getAllOrders: () => {
        return orders;
    },
}