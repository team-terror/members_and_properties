var mysql = require('mysql');

exports.handler = (event, context, callback) => {
    // TODO implement
    var connection = mysql.createConnection({
      host     : 'nordstromterror.c7b1493plokd.us-west-2.rds.amazonaws.com',
      user     : 'terror_admin',
      password : 'superterror',
      database : 'terrorible_airbnb'
    });

    var values = [event.name, event.email, event.password];
    var query = mysql.format('INSERT INTO users (name, email, password) VALUES (??, ??, ??)', values);

    connection.connect();

    connection.query(
        query,
        function (error, results, fields) {
            if (error) {
                throw error;
            }
        }
    );

    connection.end();

    callback(null, 'test');
};
