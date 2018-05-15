var AWS = require('aws-sdk'),
    bcrypt = require('bcrypt-nodejs'),
    documentClient = new AWS.DynamoDB.DocumentClient();

var lambda = new AWS.Lambda({
    region: 'us-west-2' //change to your region
    });


exports.login = function(event, context, callback) {
    lambda.invoke({
        FunctionName: "terrorGetMember",
        Payload: JSON.stringify({
            email: event.email
        }, null, 2)
    }, function(err, data) {
        if (err) {
            console.error(err);
        }
        if (data.Payload) {
            var hashed_password = JSON.parse(data.Payload).Item.hashed_password;
            bcrypt.compare(event.password, hashed_password, function(err, data) {
                if (err) {
                    console.error(err);
                }
                console.info(data);
            });
        }
    });
}
