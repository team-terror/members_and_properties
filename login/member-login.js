var AWS = require('aws-sdk'),
    bcrypt = require('bcrypt-nodejs'),
    documentClient = new AWS.DynamoDB.DocumentClient()
    jwt = require('jsonwebtoken')

var lambda = new AWS.Lambda({
    region: 'us-west-2'
    });

var ssm = new AWS.SSM();
var params = {
    Name: "jwtkey",
    WithDecryption: true
}

exports.login = function(event, context, callback) {
    var jwtkey;
    ssm.getParameter(params, function(err, data) {
        if (err) {
            console.error(err);
        }
        jwtkey = data.Parameter.Value;
    });

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
                jwtkey,
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
