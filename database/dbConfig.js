//connection to database
const mysql = require("mysql");

function createDBConnection() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'shubhi',
    password: 'shubhi123',
    database: 'inventory',
    port: 3306 // Use the correct port number here
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return;
    }
    console.log("Connected to the database");
  });

  // Perform database operations here

  return connection;
}

module.exports = createDBConnection;
