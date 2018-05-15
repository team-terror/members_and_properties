var AWS = require('aws-sdk'),
    bcrypt = require('bcrypt-nodejs'),
	documentClient = new AWS.DynamoDB.DocumentClient();

// Returns the member data associated with an email if it exists.
exports.getMember = function(event, context, callback) {
    var params = {
        Key : {
            "member_email": event.email
        },
        TableName : process.env.TABLE_NAME
    };
    documentClient.get(params, function(err, data) {
        if (err) {
            console.error(JSON.toString(err));
        }
        callback(err, data);
    });
};
