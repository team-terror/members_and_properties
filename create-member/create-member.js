var AWS = require('aws-sdk'),
    bcrypt = require('bcrypt-nodejs'),
	documentClient = new AWS.DynamoDB.DocumentClient();

function parseEvent(event) {
    if (typeof event.name !== "string"
        || typeof event.email !== "string"
        || typeof event.password !== "string") {
            throw new Error("event field is not a string");
        }
    if (event.name.length === 0
        || event.email.length === 0
        || event.password.length === 0) {
            throw new Error("empty strings are not allowed");
        }
}

exports.createMember = function(event, context, callback){
    parseEvent(event);
    var salt;

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            console.error(err);
        }
        bcrypt.hash(event.password, salt, () => {}, function(err, hash) {
            if (err) {
                console.error(err);
            }
            var params = {
                Item : {
                    "member_name" : event.name,
                    "member_email": event.email,
                    "member_join_time": Date.now(),
                    "hashed_password": hash,
                    "salt": salt
                },
                TableName : process.env.TABLE_NAME
            };
            documentClient.put(params, function(err, data){
                if (err) {
                    console.error(err);
                }
                callback(err, "member inserted");
            });
        });
    });
}
