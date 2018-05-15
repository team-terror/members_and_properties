var AWS = require('aws-sdk'),
    uuidv1 = require('uuid/v1'),
    bcrypt = require('bcrypt-nodejs'),
	documentClient = new AWS.DynamoDB.DocumentClient();
