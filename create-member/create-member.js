
var AWS = require('aws-sdk'),
    uuidv1 = require('uuid/v1'),
    bcrypt = require('bcrypt-nodejs'),
	documentClient = new AWS.DynamoDB.DocumentClient();

exports.writeMovie = function(event, context, callback){
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
                    "member_id" : uuidv1(),
                    "member_name" : event.name,
                    "member_email": event.email,
                    "hashed_password": hash,
                    "salt": salt
                },
                TableName : process.env.TABLE_NAME
            };
            documentClient.put(params, function(err, data){
                if (err) {
                    console.error(err);
                }
                callback(err, "some success message");
            });
        });
    });
}
