const payment = require('../src/backend/Utils/payment');

//const card = elements.create('card', {style});
//card.mount('#card-element');

const testCard = {
    cardNumber: 5555555555554444,
    cardExpiry: 0422, 
    cardCvc: 321,
}

const images = [{
    imageId: '123',
    price: 5
  },
  {
    imageId: '124',
    price: 10
  },
  {
    imageId: '125',
    price: 15
}]

console.log(images);
console.log(payment.createOrder(images));


/*payment.paymentIntent(500).then(data => {
  console.log(data);
})

test('Testing payment intent of 500', async () => {
  const result = await payment.createPaymentIntent(500);
  expect(result.toBe(500));
})*/
