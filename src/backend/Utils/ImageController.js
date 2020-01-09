var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-2',
    accessKeyId: 'AKIAT4TCDNU4LMOBOPOA',
    secretAccessKey: '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',
    endpoint: 'http://localhost:8000'
})

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    /**
     * Adds a new Image to repository
     */
    addImage: (image) => {
        const date = new Date();

        const params = {
            TableName: "Images",
            Item: {
                "picId": image.picId,
                "title": image.title,
                "uploadDate": date,
                "tags": image.tags,
                "discount": image.discount,
                "discountPercentage": image.discountPercentage,
                "price": image.price,
                "rating": 0,
                "description": image.description,
                "private": image.private
            }
        };

        docClient.put(params, function(err, data) {
            if (err) {
                console.log(`There was an error adding the picture. ${err}`)
            } else {
                console.log(`Added new picture ${params.picId}: ${params.title}`)
            }
        })
    },

    /**
     * Reads an existing image
     */
    readImage: (image) => {
        const params = {
            TableName: "Images",
            Key:{
                "picId": image.picId
            }
        }

        docClient.get(params, function(err, data) {
            if (err) {
                console.log(`There was an error retrieving the picture. ${err}`);
            } else {
                console.log(`Successfully retrieved the Item!`, JSON.stringify(data, null, 2));
            }
        })
    },

        /**
     * Updates an existing image
     * We probably want to read first then update
     */
    updateImage: (image) =>{
        const params = {
            TableName: "Images",
            Key:{
                "picId": image.picId
            },
            UpdateExpression: "set title = :t, uploadDate = :u, tags = :t, cost = :c, rating = :r, description = :d, private = :p",
            ExpressionAttributeValues:{
                ":t": image.title,
                ":u": image.uploaddDate,
                ":t": image.tags,
                ":c": image.cost,
                ":r": image.rating,
                ":d": image.description,
                ":p": image.private
            },
            ReturnValues:"UPDATED_NEW"
        };
        docClient.update(params, function(err, data) {
            if (err) {
                console.log(`There was an error updating the picture. ${err}`);
            } else {
                console.log(`Successfully updated ${params.picId}: ${params.title}`);
            }
        })
    },

    /**
     * Removes an existing image
     */
    deleteImage: (image) => {
        const params = {
            TableName: "Images",
            Key:{
                "picId": image.picId
            },
        }
        docClient.update(params, function(err, data) {
            if (err) {
                console.log(`There was an error deleting the picture. ${err}`)
            } else {
                console.log(`Successfully deleted ${params.picId}`)
            }
        })
    },

    filterImage: (properties) => {
        const params = {
            TableName: "Images",
            
        }
    }
}