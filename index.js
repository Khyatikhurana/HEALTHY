const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// -------------- getting components --------------

// navbar component
const navbarHTML = fs.readFileSync(path.join(__dirname, 'components', 'navbar.html'), 'utf-8');
const navbarJS = fs.readFileSync(path.join(__dirname, 'components', 'navbar.js'), 'utf-8');
const navbar = `${navbarHTML}\n<script>${navbarJS}</script>`;


// ----------------- getting pages -----------------

// upload screen
const uploadFile = fs.readFileSync(path.join(__dirname, 'screens', 'scheduling', 'scheduling.html'), 'utf-8');
const uploadFileJs = fs.readFileSync(path.join(__dirname, 'screens', 'scheduling', 'script.js'), 'utf-8');
const uploadCombinedContent = `${uploadFile}\n<script>${uploadFileJs}</script>`;

// dashboard screen
const dashboard = fs.readFileSync(path.join(__dirname, 'screens', 'dashboard', 'index.html'), 'utf-8');
const dashboardJS = fs.readFileSync(path.join(__dirname, 'screens', 'dashboard', 'script.js'), 'utf-8');
const dashboardCSS = fs.readFileSync(path.join(__dirname, 'screens', 'dashboard', 'style.css'), 'utf-8');
const dashboardCombinedContent = `${dashboard}\n<script>${dashboardJS}</script><style>${dashboardCSS}</style>`;

// booking screen
const schedule = fs.readFileSync(path.join(__dirname, 'screens', 'scheduling', 'scheduling.html'), 'utf-8');
const scheduleJS= fs.readFileSync(path.join(__dirname, 'screens', 'scheduling', 'script.js'), 'utf-8');
const scheduleCombinedContent = `${schedule}\n<script>${scheduleJS}</script>`;

// authentication screen
const authentication = fs.readFileSync(path.join(__dirname, 'screens', 'authentication', 'signUp.html'), 'utf-8');
const authenticationJS = fs.readFileSync(path.join(__dirname, 'screens', 'authentication', 'signUp.js'), 'utf-8');
const authenticationCombinedContent = `${authentication}\n<script>${authenticationJS}</script>`;



// ---------------- routing -----------------

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// --------- Serve landing page-------------

app.get('/', (req, res) => {
  console.log('Request received for landing page');
  res.status(200).send('<h2>Welcome to our NodeJS server</h2>');
});

//------------- appointment page -------------

app.get('/appointment', (req, res) => {
  console.log('Request received for appointment page');
  res.status(200).send('<h2>Appointment page</h2>');
});
// ------------- Dashboard page -------------

app.get('/dashboard', (req, res) => {
  console.log('Request received for dashboard page');
  const output = dashboardCombinedContent.replace('{%NAVBAR%}', navbar);
  res.status(200).send(output);
  // console.log(output);
});


// ---------- Schedule page -------------

app.get('/booking', (req, res) => {
  console.log('Request received for booking page');
  res.status(200).send(scheduleCombinedContent);
});

app.post('/booking', (req, res) => {
  console.log("new request :)");
  console.log(req.body);
  // Handle POST data as needed
  res.status(200).send('Received the form data');
});

// ---------- Serve file upload page -------------
app.get('/files', (req, res) => {
  console.log('Request received for file upload page');
  res.status(200).send(uploadCombinedContent);
});

// ---------- User profile page -------------
app.get('/user', (req, res) => {
  console.log('Request received for user profile page');
  res.status(200).send('<h2>User page</h2>')
});




// ------------------ Server ------------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening to requests on port ${PORT}...`);
});

