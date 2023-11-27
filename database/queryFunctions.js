const createDBConnection = require('./dbConfig'); // Import database connection
const connection = createDBConnection(); // Create a connection

// authentication
function signInCheck(username, callback) {
  const signIn = "SELECT patient_id, password FROM patient WHERE patient_id = ?";
  connection.query(signIn, [username], callback);
}

function signUpCheck(values, callback) {
  const signUp = 'INSERT INTO patient (username, first_name, last_name, email_id, phone_no, password) VALUES (?)';
  connection.query(signUp, [values], callback);
}

function getUserName(username, callback) {
  const getName = "SELECT first_name FROM patient WHERE patient_id = ?";
  connection.query(getName, [username], callback);
}

module.exports = {
  signInCheck,
  signUpCheck,
  getUserName,
  // Export other query functions as needed
};
