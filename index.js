const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// upload screen
const uploadFile = fs.readFileSync(path.join(__dirname, 'screens', 'scheduling', 'scheduling.html'), 'utf-8');
const uploadFileJs = fs.readFileSync(path.join(__dirname, 'screens', 'scheduling', 'script.js'), 'utf-8');
const uploadCombinedContent = `${uploadFile}\n<script>${uploadFileJs}</script>`;

// dashboard screenn
const dashboard = fs.readFileSync(path.join(__dirname, 'screens', 'dashboard', 'index.html'), 'utf-8');
const dashboardJS = fs.readFileSync(path.join(__dirname, 'screens', 'dashboard', 'script.js'), 'utf-8');
const dashboardCSS = fs.readFileSync(path.join(__dirname, 'screens', 'dashboard', 'style.css'), 'utf-8');
const dashboardCombinedContent = `${dashboard}\n<script>${dashboardJS}</script><style>${dashboardCSS}</style>`;

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
// Serve landing page
app.get('/', (req, res) => {
  console.log('Request received');
  res.status(200).send('<h2>Welcome to our NodeJS server</h2>');
});

// appointment page
app.get('/appointment', (req, res) => {
  console.log('Request received');
  res.status(200).send(uploadCombinedContent);
});

// Schedule page
app.get('/dashboard', (req, res) => {
  console.log('Request received');
  res.status(200).send(dashboardCombinedContent);
});

// Handle POST request to booking
app.post('/booking', (req, res) => {
  console.log("new request :)");
  console.log(req.body);
  // Handle POST data as needed
  res.status(200).send('Received the form data');
});

// Serve file upload page
app.get('/files', (req, res) => {
  console.log('Request received');
  res.status(200).send(uploadCombinedContent);
});

// User profile page
app.get('/user', (req, res) => {
  console.log('Request received');
  res.status(200).send(combinedContent);
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening to requests on port ${PORT}...`);
});
