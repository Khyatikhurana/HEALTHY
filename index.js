const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const uploadFile = fs.readFileSync(path.join(__dirname, 'frontend', 'scheduling', 'scheduling.html'), 'utf-8');
const uploadFileJs = fs.readFileSync(path.join(__dirname, 'frontend', 'scheduling', 'script.js'), 'utf-8');
const combinedContent = `${uploadFile}\n<script>${uploadFileJs}</script>`;

app.use(express.json());

// Serve landing page
app.get('/', (req, res) => {
  console.log('Request received');
  res.status(200).send('<h2>Welcome to our NodeJS server</h2>');
});

// Serve file upload page
app.get('/schedule', (req, res) => {
  console.log('Request received');
  res.status(200).send(combinedContent);
});

// Handle POST request to /schedule
app.post('/schedule', (req, res) => {
  console.log("new request :)");
  console.log(req.body);
  // Handle POST data as needed
  res.status(200).send('Received the form data');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening to requests on port ${PORT}...`);
});
