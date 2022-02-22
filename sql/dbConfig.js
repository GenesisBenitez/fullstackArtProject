const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
// const ApplicationConstants = require("../constants/constants");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "artistProject"
});

connection.connect(function(err){
    if(err) throw err;
});

module.exports = connection;