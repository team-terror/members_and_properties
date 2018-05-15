var AWS = require('aws-sdk'),
    bcrypt = require('bcrypt-nodejs'),
    documentClient = new AWS.DynamoDB.DocumentClient()
    jwt = require('jsonwebtoken')

var lambda = new AWS.Lambda({
    region: 'us-west-2'
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
            var item = JSON.parse(data.Payload).Item;
            var hashed_password = item.hashed_password;

            bcrypt.compare(event.password, hashed_password, function(err, data) {
                if (err) {
                    console.error(err);
                }
                jwt.sign({
                    email: item.email
                },
                "shhhh",
                function(err, token) {
                    if (err) {
                        console.error(err);
                    }
                    callback(err, token);
                })
            });
        }
    });
}
