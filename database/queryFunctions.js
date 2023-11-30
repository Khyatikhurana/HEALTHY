const createDBConnection = require("./dbConfig"); // Import database connection
const connection = createDBConnection(); // Create a connection

// authentication
function signInCheck(username, callback) {
  const signIn =
    "SELECT patient_id, password FROM patient WHERE patient_id = ?";
  connection.query(signIn, [username], callback);
}

function signUpCheck(values, callback) {
  const signUp =
    "INSERT INTO patient (username, first_name, last_name, email_id, phone_no, password) VALUES (?)";
  connection.query(signUp, [values], callback);
}

function getUserName(userID, callback) {
  const getName = "SELECT first_name FROM patient WHERE patient_id = ?";
  connection.query(getName, [userID], callback);
}

function getUserDetails(userID, callback) {
  const getUserDetails = "SELECT * FROM patient WHERE patient_id = ?";
  connection.query(getUserDetails, [userID], callback);
  connection.query(getUserDetails, [userID], callback);
}

function getUserUpcomingAppointments(userID, callback) {
  const getAppointments =
    "SELECT appointment.date, doctor.first_name AS doctor_first_name, doctor.last_name AS doctor_last_name \
    FROM appointment \
    JOIN doctor ON appointment.doc_id = doctor.doc_id \
    WHERE appointment.patient_id = ? \
    AND appointment.status = 'scheduled' \
    AND appointment.date > CURDATE() \
    ORDER BY appointment.date ASC, appointment.slot_id ASC \
    LIMIT 1;";

  connection.query(getAppointments, [userID], callback);
}

function getDepartments(callback) {
  const getAppointments = "SELECT DISTINCT department FROM doctor;";
  connection.query(getAppointments, callback);
}

function getDepartmentsDoctor(department, callback) {
  const getAppointments =
    "SELECT doc_id, first_name, last_name FROM doctor WHERE department = ?;";
  connection.query(getAppointments, [department], callback);
}

function getDoctorAvailableSlots(doc_id, date, day, callback) {
  const getAppointments =
    "SELECT da.slot_id, s.slot_timing \
    FROM doctor_availability da \
    JOIN slot s ON da.slot_id = s.slot_id \
    LEFT JOIN appointment a ON da.slot_id = a.slot_id AND a.date = ? AND a.doc_id = ? \
    WHERE da.doc_id = ? \
    AND da.day_of_week = ? \
    AND a.appointment_id IS NULL;";

  connection.query(getAppointments, [date, doc_id, doc_id, day], callback);
}

function bookAppointment(values, callback) {
  const bookAppointment =
    "INSERT INTO appointment (doc_id, patient_id, date, slot_id, day, status)VALUES (?,'scheduled')";
  connection.query(bookAppointment, [values], callback);
}

function getUpcomingAppointments(userID, callback) {
  const getAppointments =
    "SELECT appointment.date,appointment.appointment_id, doctor.first_name AS doctor_first_name, doctor.last_name AS doctor_last_name \
    FROM appointment \
    JOIN doctor ON appointment.doc_id = doctor.doc_id \
    WHERE appointment.patient_id = ? \
    AND appointment.status = 'scheduled' \
    AND appointment.date > CURDATE() \
    ORDER BY appointment.date ASC, appointment.slot_id ASC \
    LIMIT 3;";

  connection.query(getAppointments, [userID], callback);
}

function getDocterDetails(callback) {
  const getDocterDetails =
   "SELECT first_name, last_name, department, specialist, email_id, clinic_name FROM doctor";
  connection.query(getDocterDetails, callback);
}

function allAppointments(userID, callback) {
  const getAppointments = `SELECT d.first_name AS doctor_first_name, d.last_name AS doctor_last_name, a.date, a.status, s.slot_timing AS appointment_time
    FROM appointment a
    JOIN doctor d ON a.doc_id = d.doc_id
    JOIN slot s ON a.slot_id = s.slot_id
    WHERE a.patient_id = ?
    ORDER BY a.date DESC, s.slot_timing DESC;
`;
  connection.query(getAppointments, [userID], callback);
}

function deleteAppointment(appointmentID, callback) {
  const deleteAppointment = `UPDATE appointment SET status = "Cancelled" WHERE appointment_id = ?`;
  connection.query(deleteAppointment, [appointmentID], callback);
}

// doctor side

function getDoctorName(docID, callback) {
  const getName = "SELECT first_name,last_name FROM doctor WHERE doc_id = ?";
  connection.query(getName, [docID], callback);
}

function getDoctorUpcomingAppointments(userID, callback) {
  const getAppointments = `SELECT appointment.date, 
  appointment.appointment_id, 
  patient.first_name AS patient_first_name, 
  patient.last_name AS patient_last_name
  FROM appointment
  JOIN patient ON appointment.patient_id = patient.patient_id
  WHERE appointment.doc_id = 1
  AND appointment.status = 'scheduled' 
  OR appointment.status = 'Scheduled'
  AND date >= CURDATE() 
  ORDER BY appointment.date ASC, appointment.slot_id ASC;`;

  connection.query(getAppointments, [userID], callback);
}

function getAllDoctorUpcomingAppointments(userID, callback) {
  const getAppointments = `SELECT appointment.date,
  appointment.appointment_id,
  appointment.status,
  patient.first_name AS patient_first_name,
  patient.last_name AS patient_last_name,
  slot.slot_timing
  FROM appointment
  JOIN patient ON appointment.patient_id = patient.patient_id
  JOIN slot ON appointment.slot_id = slot.slot_id
  ORDER BY appointment.date DESC, slot.slot_id ASC;
  `;

  connection.query(getAppointments, [userID], callback);
}

module.exports = {
  signInCheck,
  signUpCheck,
  getUserName,
  getUserDetails,
  getUserUpcomingAppointments,
  getUpcomingAppointments,
  getDepartments,
  getDepartmentsDoctor,
  getDoctorAvailableSlots,
  bookAppointment,
  allAppointments,
  deleteAppointment,
  getDoctorName,
  getDoctorUpcomingAppointments,
  getDocterDetails,
  getAllDoctorUpcomingAppointments,
  // Export other query functions as needed
};
