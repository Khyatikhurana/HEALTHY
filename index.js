const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

// -------------- getting components --------------

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
  path.join(__dirname, "screens", "uploadFile", "index.html"),
  "utf-8"
);
const uploadFileJs = fs.readFileSync(
  path.join(__dirname, "screens", "uploadFile", "script.js"),
  "utf-8"
);
const uploadScreen = `${uploadFile}\n<script>${uploadFileJs}</script>`;

// dashboard screen
const dashboard = fs.readFileSync(
  path.join(__dirname, "screens", "dashboard", "index.html"),
  "utf-8"
);
const dashboardJS = fs.readFileSync(
  path.join(__dirname, "screens", "dashboard", "script.js"),
  "utf-8"
);
const dashboardCSS = fs.readFileSync(
  path.join(__dirname, "screens", "dashboard", "style.css"),
  "utf-8"
);
const dashboardScreen = `${dashboard}\n<script>${dashboardJS}</script><style>${dashboardCSS}</style>`;

// booking screen
const schedule = fs.readFileSync(
  path.join(__dirname, "screens", "scheduling", "scheduling.html"),
  "utf-8"
);
const scheduleJS = fs.readFileSync(
  path.join(__dirname, "screens", "scheduling", "script.js"),
  "utf-8"
);
const scheduleScreen = `${schedule}\n<script>${scheduleJS}</script>`;

// authentication screen
const authentication = fs.readFileSync(
  path.join(__dirname, "screens", "authentication", "signUp.html"),
  "utf-8"
);
const authenticationJS = fs.readFileSync(
  path.join(__dirname, "screens", "authentication", "signUp.js"),
  "utf-8"
);
const authScreen = `${authentication}\n<script>${authenticationJS}</script>`;

// user profile screen

// ------------------------------ routing ---------------------------------

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// --------- Serve landing page-------------

app.get("/", (req, res) => {
  console.log("Request received for landing page");
  res.status(200).send("<h2>Welcome to our NodeJS server</h2>");
});

//------------- appointment page -------------

app.get("/appointment", (req, res) => {
  console.log("Request received for appointment page");
  res.status(200).send("<h2>Appointment page</h2>");
});
// ------------- Dashboard page -------------

app.get("/dashboard", (req, res) => {
  console.log("Request received for dashboard page");
  const output = dashboardScreen.replace("{%NAVBAR%}", navbar);
  res.status(200).send(output);
  // console.log(output);
});

// ---------- Authentication page -------------

var username =""
var uderid = ""
app.get("/authentication", (req, res) => {
  console.log("Request received for booking page");
  res.status(200).send(authScreen);
});

app.post("/booking", (req, res) => {
  const requestPurpose = req.headers["request-purpose"];

  if (requestPurpose === "signin") {
    // --------- sign in -------------
    console.log("Sign-in request received");
    console.log(req.body);
    res.status(200).send("Received the sign-in request");
    // TODO: check db
    res.redirect("/dashboard");
  } else if (requestPurpose === "signup") {
    // Handle sign-up logic based on req.body
    console.log("Sign-up request received");
    console.log(req.body);
    // TODO: add to db
    res.status(200).send("Received the sign-up request");
    res.redirect("/dashboard");
  } else {
    res.status(400).send("Invalid request purpose");
  }
});

// ---------- Schedule page -------------

app.get("/booking", (req, res) => {
  console.log("Request received for booking page");
  res.status(200).send(scheduleScreen);
});

app.post("/booking", (req, res) => {
  console.log("new request :)");
  console.log(req.body);
  // Handle POST data as needed
  res.status(200).send("Received the form data");
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
