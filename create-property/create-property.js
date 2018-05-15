var AWS = require('aws-sdk'),
    uuidv1 = require('uuid/v1'),
	documentClient = new AWS.DynamoDB.DocumentClient();

exports.createProperty = function(event, context, callback) {
    var property_id = uuidv1();
    var params = {
        Item: {
            "property_id": property_id,
            "address": event.address,
            "description": event.description,
            "sq_footage": event.sq_footage,
            "instructions": event.instructions,
            "max_occupancy": event.max_occupancy,
            "member_id": event.member_id
        },
        TableName: process.env.TABLE_NAME
    };
    documentClient.put(params, function(err, data) {
        if (err) {
            console.error(err);
        }
        callback(err, `property ${property_id} created`);
    });
}
