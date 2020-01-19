Attempt for the 2020 backend challenge at Shopify

The app uses MongoDB, Express, NodeJS

feel free to use the following routes:

# /images/ ROUTES  

Method | HTTP REQUEST| Description                                                                   |
|---| -------------- | ----------------------------------------------------------------------------- |  
|GET|'/images'       | Returns all available images                                                  |  
|GET|'/images/:title'| Returns the image with the title accepts string                               |  
|GET|'/images?tags=' | Returns the image with the provided tags accepts arrays such as ['bah', 'dah']|  
|POST|'/images/addImage'  |   Add a new image  |
|PUT| 'images/update/:title' | Updates an existing image, depending on fields provided in body will update the price, amount available |
|DELETE| '/images/delete/:title' | Removes image of provided title |

# /shopping-cart/ ROUTES
Method | HTTP REQUEST | Description|
|---|--------------|------------|
|GET|'/shopping-cart'                             | Returns current items in the shopping cart  |
|GET|'/shopping-cart/checkout?discount='          | Creates an order with calculated price of all current items in shopping cart  |
|GET|'/shopping-cart/checkout/:ordernum'          | Creates a PaymentIntent with provided ordernum for Stripe processing  |
|POST|'/shopping-cart'                            |       Adds a new image to shopping cart  |

