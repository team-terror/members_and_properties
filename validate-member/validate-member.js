var AWS = require('aws-sdk'),
    documentClient = new AWS.DynamoDB.DocumentClient(),
    jwt = require('jsonwebtoken'),
    ssm = new AWS.SSM();

var params = {
    Name: "jwtkey",
    WithDecryption: true
}

exports.validateMember = function(event, context, callback) {
    var token = event.headers["x-access-token"];
    var jwtkey;
    ssm.getParameter(params, function(err, data) {
        if (err) {
            console.error(err);
        }
        jwtkey = data.Parameter.Value;

        jwt.verify(token, jwtkey, function(err, decoded) {
            if (err) {
                callback(JSON.stringify({
                    status: 401,
                    message: "Invalid token"
                }));
            }
            callback(err, decoded);
        });
    });
};
