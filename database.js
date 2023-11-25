const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'project-database.cdwuwvatsiu1.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'ArRoKhSh',
  database: 'inventory',
  port: 3306 // Use the correct port number here
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Perform database operations here

connection.end();
