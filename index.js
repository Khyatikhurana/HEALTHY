const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const queryFunctions = require("./database/queryFunctions"); // Import your queryFunctions file
const dateFormatter = require("./database/dateFormatter"); // Import your queryFunctions file
const fillTemplate = require("./database/fillDepartment"); // Import your queryFunctions file
const fillAppointments = require("./database/fillAppointments"); // Import your queryFunctions file
const fillTable = require("./database/fillTable"); // Import your queryFunctions file

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
  path.join(__dirname, "screens", "uploadFile", "uploadFile.html"),
  "utf-8"
);
const uploadFileJs = fs.readFileSync(
  path.join(__dirname, "screens", "uploadFile", "uploadFile.js"),
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

// appointment screen
const appointment = fs.readFileSync(
  path.join(__dirname, "screens", "appointment", "appointment.html"),
  "utf-8"
);
const appointmentJs = fs.readFileSync(
  path.join(__dirname, "screens", "appointment", "appointment.js"),
  "utf-8"
);
const appointmentCSS = fs.readFileSync(
  path.join(__dirname, "screens", "appointment", "appointment.css"),
  "utf-8"
);
const appointmentScreen = `${appointment}\n<script>${appointmentJs}</script><style>${appointmentCSS}</style>`;

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
  path.join(__dirname, "screens", "userProfile", "userprofile.html"),
  "utf-8"
);
const userProfileCSS = fs.readFileSync(
  path.join(__dirname, "screens", "userProfile", "userprofile.css"),
  "utf-8"
);
const userScreen = `${userProfile}\n<style>${userProfileCSS}</style>`;
// ------------------------------ routing ---------------------------------
var activeUserId = "";

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// --------- Serve landing page - Authentication page -------------

app.get("/", (req, res) => {
  if (activeUserId !== "") {
    res.redirect("/dashboard");
    return;
  }
  console.log("Request received for authentication page");
  res.status(200).send(authScreen);
});

app.post("/signin", (req, res) => {
  const { userid, userpswd } = req.body;
  console.log(userid);
  console.log(userpswd);

  queryFunctions.signInCheck(userid, (error, results) => {
    if (error) {
      console.error("Error fetching user data:", error);
      return;
    }
    // console.log("Query results:", results);
    if (results.length === 0) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }
    if (results[0].password !== userpswd) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }
    activeUserId = userid;
    res.status(200).json({ message: "Authentication successful" });
  });
});

app.post("/signup", (req, res) => {
  const { firstName, lastName, username, email, phoneNumber, password } = req.body;
  const newUser = [username, firstName, lastName, email, phoneNumber, password];
  queryFunctions.signUpCheck(newUser, (error, results) => {
    if (error) {
      console.error("Error updating user table:", error);
      return;
    }

    console.log("Query results:", results);
    console.log(results.insertId); // This will output the insertId value, in this case, 45
    activeUserId = results.insertId;
    res.status(200).json({ message: "Authentication successful" });
  });
});

app.get("/logout", (req, res) => {
  activeUserId = "";
  res.redirect("/");
});
// ------------- Dashboard page -------------

app.get("/dashboard", (req, res) => {
  console.log("active user id", activeUserId);
  if (activeUserId === "") {
    res.redirect("/");
    return;
  }
  console.log("Request received for dashboard page");

  queryFunctions.getUserName(activeUserId, (error, results) => {
    if (error) {
      console.error("Error updating user table:", error);
      return;
    }
    console.log("Query results:", results);
    console.log(results[0].first_name);
    console.log("Request received for dashboard page");
    var temp1 = dashboardScreen.replace(
      "{%USER-NAME%}",
      results[0].first_name
    );
    temp1 = temp1.replace("{%NAVBAR%}", navbar);
    temp1 = temp1.replace("{%USER-ID%}", activeUserId);

    queryFunctions.getUserUpcomingAppointments(
      activeUserId,
      (error, results) => {
        if (error) {
          console.error("Error updating user table:", error);
          return;
        }
        if (results.length === 0) {
          var output = temp1.replace("{%APPT-DATE%}", "No");
          output = output.replace("{%DR-NAME%}", "Any Doctor");
          res.status(200).send(output);
          return;
        }
        // console.log("Query results:", results);
        const formattedDate = dateFormatter.formatDate(results[0].date);
        var output = temp1.replace("{%APPT-DATE%}", formattedDate);
        output = output.replace(
          "{%DR-NAME%}",
          `Dr. ${results[0].doctor_first_name} ${results[0].doctor_last_name}`
        );
        res.status(200).send(output);
      }
    );
  });
});

//------------- appointment page -------------

app.get("/appointment", (req, res) => {
  // if not signed in redirect to landing page
  if (activeUserId === "") {
    res.redirect("/");
    return;
  }
  console.log("Request received for appointment page");
  queryFunctions.getUpcomingAppointments(activeUserId, (error, results) => {
    if (error) {
      console.error("Error getting appointments:", error);
      return;
    }
    // console.log("Query results:", results);
    var temp = fillAppointments.replaceAppointmentDepartment(results);
    var output = appointmentScreen.replace("{%NAVBAR%}", navbar);
    output = output.replace("{%UPCOMING%}", temp);

    queryFunctions.allAppointments(activeUserId, (error, results) => {
      if (error) {
        console.error("Error getting appointments:", error);
        return;
      }
      // console.log("Query results:", results);
      var temp = fillTable.fillTable(results);
      output = output.replace("{%HISTORY%}", temp);
      res.status(200).send(output);
    });
  });
});

app.post("/deleteAppointment",(req, res) => {
  console.log("Request received for deleting appointment");
  console.log(req.body);
  queryFunctions.deleteAppointment(
    req.body.appointment_id,
    (error, results) => {
      if (error) {
        console.error("Error deleting:", error);
        return;
      }
      console.log("Query results:", results);
      res.status(200).send(results);
    }
  );
});

// ---------- Schedule page -------------

app.get("/booking", (req, res) => {
  if (activeUserId === "") {
    res.redirect("/");
    return;
  }
  console.log("Request received for booking page");
  var temp = scheduleScreen.replace("{%NAVBAR%}", navbar);
  temp = temp.replace("{%PATIENT-ID%}", activeUserId);
  queryFunctions.getDepartments((error, results) => {
    if (error) {
      console.error("Error getting departments:", error);
      return;
    }
    const output = fillTemplate.replaceAppointmentDepartment(temp, results);
    res.status(200).send(output);
  });
});

app.post("/getProvider", (req, res) => {
  console.log("Request received for getting providers");
  queryFunctions.getDepartmentsDoctor(req.body.department, (error, results) => {
    if (error) {
      console.error("Error getting providers:", error);
      return;
    }
    // console.log("Query results:", results);
    res.status(200).send(results);
  });
});

app.post("/getProviderSlots", (req, res) => {
  console.log("Request received for getting provider slots");
  queryFunctions.getDoctorAvailableSlots(
    req.body.doc_id,
    req.body.date,
    req.body.day,
    (error, results) => {
      if (error) {
        console.error("Error getting slots:", error);
        return;
      }
      // console.log("Query results:", results);
      res.status(200).send(results);
    }
  );
});

app.post("/bookAppointment", (req, res) => {
  console.log("Request received for booking");
  console.log(req.body);
  queryFunctions.bookAppointment(
    [
      req.body.doctorId,
      activeUserId,
      req.body.appointmentDate,
      req.body.slotId,
      req.body.apppintmentTime,
    ],
    (error, results) => {
      if (error) {
        console.error("Error booking:", error);
        return;
      }
      console.log("Query results:", results);
      res.status(200).send(results);
    }
  );
});

// ----------  file upload page -------------
app.get("/files", (req, res) => {
  // if not signed in redirect to landing page
  if (activeUserId === "") {
    res.redirect("/");
    return;
  }
  console.log("Request received for file upload page");
  const output = uploadScreen.replace("{%NAVBAR%}", navbar);
  res.status(200).send(output);
});

// ---------- User profile page -------------
app.get("/user", (req, res) => {
  // if not signed in redirect to landing page
  if (activeUserId === "") {
    res.redirect("/");
    return;
  }
  console.log("Request received for user profile page");
  queryFunctions.getUserDetails(activeUserId, (error, results) => {
    if (error) {
      console.error("Error getting data:", error);
      return;
    }
    console.log("Query results:", results);
    var output = userScreen.replace("{%NAVBAR%}", navbar);
    output = output.replace("{%USER-ID%}", activeUserId);
    output = output.replace("{%USER-EMAIL%}", results[0].email_id);
    output = output.replace("{%FIRSTNAME%}", results[0].first_name);
    output = output.replace("{%LASTNAME%}", results[0].last_name);
    output = output.replace("{%PHONENUMBER%}", results[0].phone_no);
    res.status(200).send(output);
  });
});

// ------------------ Server ------------------
const PORT = process.env.PORT || 443;
app.listen(PORT, () => {
  console.log(`Listening to requests on port ${PORT}...`);
});
