/**
 * This creates the Image Database using DynamoDB
 * Make sure DynamoDB Local is running locally with the following command
 * java -D"java.library.path=./DynamoDBLocal_lib" -jar DynamoDBLocal.jar -sharedDb (on Windows)
 * java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb (on Mac/Linux)
 */

var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-2',
    accessKeyId: keyId,
    secretAccessKey: accessKey,
    endpoint: 'http://localhost:8000'
})

var dynamodb = new AWS.DynamoDB();

/**
 * For now we're going to assume this is for one person's shop
 * To scale we would probably use userId as HASH and title with RANGE
 */
var params = {
    TableName: 'Images',
    KeySchema: [
        { AttributeName: 'picId', KeyType: 'HASH' },
    ],
    AttributeDefinitions: [
        { AttributeName: "picId", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" },
        { AttributeName: "uploadDate", AttributeType: "S" },
        { AttributeName: "tags", AttributeType: "SS" },
        { AttributeName: "discount", AttributeType: "BOOL" },
        { AttributeName: "discountPercentage", AttributeType: "N" },
        { AttributeName: "price", AttributeType: "N" },
        { AttributeName: "rating", AttributeType: "N" },
        { AttributeName: "description", AttributeType: "S" },
        { AttributeName: "private", AttributeType: "BOOL" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
}

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.log(`Unable to create table. ${err}`)
    } else {
        console.log(`Created table ${params.TableName}`)
    }
})