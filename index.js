const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
/*-------------- getting components --------------*/

// navbar component
const navbarHTML = fs.readFileSync(
  path.join(__dirname, "components", "navbar.html"),
  "utf-8"
);
const navbarJS = fs.readFileSync(
  path.join(__dirname, "components", "navbar.js"),
  "utf-8"
);
const navbar = `${navbarHTML}\n<script>${navbarJS}</script>`;

// ----------------- getting pages -----------------

// upload screen
const uploadFile = fs.readFileSync(
  path.join(__dirname, "screens", "uploadFile", "uploadFile.html"),
  "utf-8"
);
const uploadFileJs = fs.readFileSync(
  path.join(__dirname, "screens", "uploadFile", "uploadfile.js"),
  "utf-8"
);
const uploadFileCSS = fs.readFileSync(
  path.join(__dirname, "screens", "uploadFile", "uploadFile.css"),
  "utf-8"
);
const uploadScreen = `${uploadFile}\n<script>${uploadFileJs}</script><style>${uploadFileCSS}</style>`;

// dashboard screen
const dashboard = fs.readFileSync(
  path.join(__dirname, "screens", "Dashboard", "dashboard.html"),
  "utf-8"
);
const dashboardJS = fs.readFileSync(
  path.join(__dirname, "screens", "Dashboard", "dashboard.js"),
  "utf-8"
);
const dashboardCSS = fs.readFileSync(
  path.join(__dirname, "screens", "Dashboard", "dashboard.css"),
  "utf-8"
);
const dashboardScreen = `${dashboard}\n<script>${dashboardJS}</script><style>${dashboardCSS}</style>`;

// booking screen
const schedule = fs.readFileSync(
  path.join(__dirname, "screens", "scheduling", "schedule.html"),
  "utf-8"
);
const scheduleJS = fs.readFileSync(
  path.join(__dirname, "screens", "scheduling", "schedule.js"),
  "utf-8"
);
const scheduleCSS = fs.readFileSync(
  path.join(__dirname, "screens", "scheduling", "schedule.css"),
  "utf-8"
);
const scheduleScreen = `${schedule}\n<script>${scheduleJS}</script><style>${scheduleCSS}</style>`;

// authentication screen
const authentication = fs.readFileSync(
  path.join(__dirname, "screens", "authentication", "authentication.html"),
  "utf-8"
);
const authenticationJS = fs.readFileSync(
  path.join(__dirname, "screens", "authentication", "authentication.js"),
  "utf-8"
);
const authScreen = `${authentication}\n<script>${authenticationJS}</script>`;

// user profile screen
const userProfile = fs.readFileSync(
  path.join(__dirname, "screens", "UserProfile", "userprofile.html"),
  "utf-8"
);
const userProfileCSS = fs.readFileSync(
  path.join(__dirname, "screens", "UserProfile", "userprofile.css"),
  "utf-8"
);
const userScreen = `${userProfile}\n<style>${userProfileCSS}</style>`;

// Appointment screen
const appointment = fs.readFileSync(
  path.join(__dirname, "screens", "appointment", "appointment.html"),
  "utf-8"
);
const appointmentJS = fs.readFileSync(
  path.join(__dirname, "screens", "appointment", "appointment.js"),
  "utf-8"
);
const appointmentCSS = fs.readFileSync(
  path.join(__dirname, "screens", "appointment", "appointment.css"),
  "utf-8"
);

const appointmentScreen = `${appointment}\n<style>${appointmentCSS}</style><script>${appointmentJS}</script>`;

// ------------------------------ routing ---------------------------------

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// --------- Serve landing page-------------

app.get("/", (req, res) => {
  console.log("Request received for landing page");
  res.redirect("/authentication");
});

//------------- appointment page -------------

app.get("/appointment", (req, res) => {
  console.log("Request received for appointment page");
  const output = appointmentScreen.replace("{%NAVBAR%}", navbar);
  res.status(200).send(output);
  // res.status(200).send("<h2>Appointment page</h2>");
});
// ------------- Dashboard page -------------

app.get("/dashboard", (req, res) => {
  console.log("Request received for dashboard page");
  const output = dashboardScreen.replace("{%NAVBAR%}", navbar);
  res.status(200).send(output);
  // console.log(output);
});

// ---------- Authentication page -------------

// var username =""
// var uderid = ""
app.get("/authentication", (req, res) => {
  console.log("Request received for booking page");
  res.status(200).send(authScreen);
});

app.post('/signin', (req, res) => {
  // const { uname, upswd } = req.body;
  // const foundUser = users.find(user => user.username === uname && user.password === upswd);
  console.log(req.body);
  // if (foundUser) {
  //   // If authentication is successful
  res.status(200).json({ message: 'Authentication successful' });
  // } else {
  //   // If authentication fails
  //   res.status(401).json({ error: 'Authentication failed' });
  // }
});

app.post('/signup', (req, res) => {
  // const { uname, upswd } = req.body;
  // const foundUser = users.find(user => user.username === uname && user.password === upswd);
  console.log(req.body);
  // if (foundUser) {
  //   // If authentication is successful
  res.status(200).json({ message: 'Authentication successful' });
  // } else {
  //   // If authentication fails
  //   res.status(401).json({ error: 'Authentication failed' });
  // }
});

// ---------- Schedule page -------------

app.get("/booking", (req, res) => {
  console.log("Request received for booking page");
  const output = scheduleScreen.replace("{%NAVBAR%}", navbar);
  res.status(200).send(output);
});

app.post("/booking", (req, res) => {
  console.log("new request :)");
  console.log(req.body);
  const output =  scheduleScreen.replace("{%NAVBAR%}", navbar);
  // Handle POST data as needed
  res.status(200).send(output);
});

// ----------  file upload page -------------
app.get("/files", (req, res) => {
  console.log("Request received for file upload page");
  const output = uploadScreen.replace("{%NAVBAR%}", navbar);
  res.status(200).send(output);
});

// ---------- User profile page -------------
app.get("/user", (req, res) => {
  console.log("Request received for user profile page");
  res.status(200).send("<h2>User page</h2>");
});

// ------------------ Server ------------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening to requests on port ${PORT}...`);
});
