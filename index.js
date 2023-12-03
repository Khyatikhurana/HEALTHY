const express = require("express");
const session = require("express-session");
const app = express();
const fs = require("fs");
const path = require("path");
const queryFunctions = require("./database/queryFunctions");
const dateFormatter = require("./database/dateFormatter");
const fillTemplate = require("./database/templatesFunctions");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const e = require("express");
require("dotenv").config();

aws.config.update({
  secretAccessKey: process.env.ACCESS_SECRET,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION,
  sessionToken: process.env.SESSION_TOKEN,
});

const BUCKET = process.env.BUCKET;
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET,
    key: function (req, file, cb) {
      const activeUserId = req.session.activeUserId; // Assuming activeuserid is stored in session
      const folderName = activeUserId + "/"; // Folder name is the active user's ID
      cb(null, folderName + file.originalname);
    },
  }),
});
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
  path.join(__dirname, "screens", "dashboard", "dashboard.html"),
  "utf-8"
);
const dashboardJS = fs.readFileSync(
  path.join(__dirname, "screens", "dashboard", "dashboard.js"),
  "utf-8"
);
const dashboardCSS = fs.readFileSync(
  path.join(__dirname, "screens", "dashboard", "dashboard.css"),
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
  path.join(__dirname,"userprofile.html"),
  "utf-8"
);
const userProfileCSS = fs.readFileSync(
  path.join(__dirname, "screens", "UserProfile", "userprofile.css"),
  "utf-8"
);
const userScreen = `${userProfile}\n<style>${userProfileCSS}</style>`;

// doctor authentication screen
const docAuthentication = fs.readFileSync(
  path.join(
    __dirname,
    "screens",
    "docAuthentication",
    "docAuthentication.html"
  ),
  "utf-8"
);
const docAuthenticationJS = fs.readFileSync(
  path.join(__dirname, "screens", "docAuthentication", "docAuthentication.js"),
  "utf-8"
);
const docAuthenticationScreen = `${docAuthentication}\n<script>${docAuthenticationJS}</script>`;

// doctor dashboard screen
const docDashboard = fs.readFileSync(
  path.join(__dirname, "screens", "docDashboard", "docDashboard.html"),
  "utf-8"
);
const docDashboardJS = fs.readFileSync(
  path.join(__dirname, "screens", "docDashboard", "docDashboard.js"),
  "utf-8"
);
const docDashboardCSS = fs.readFileSync(
  path.join(__dirname, "screens", "docDashboard", "docDashboard.css"),
  "utf-8"
);
const docDashboardScreen = `${docDashboard}\n<script>${docDashboardJS}</script><style>${docDashboardCSS}</style>`;

// ------------------------------ routing ---------------------------------
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// --------- Serve landing page - Authentication page -------------

app.get("/", (req, res) => {
  const activeUserId = req.session.activeUserId;
  if (activeUserId) {
    res.redirect("/dashboard");
    return;
  }
  res.status(200).send(authScreen);
});

app.post("/signin", (req, res) => {
  const { userid, userpswd } = req.body;
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
    req.session.activeUserId = userid;
    res.status(200).json({ message: "Authentication successful" });
  });
});

app.post("/signup", (req, res) => {
  const { firstName, lastName, username, email, phoneNumber, password } =
    req.body;
  const newUser = [username, firstName, lastName, email, phoneNumber, password];
  queryFunctions.signUpCheck(newUser, (error, results) => {
    if (error) {
      console.error("Error updating user table:", error);
      return;
    }

    // console.log("Query results:", results);
    // console.log(results.insertId); // This will output the insertId value, in this case, 45
    req.session.activeUserId = results.insertId;
    res.status(200).json({ message: "Authentication successful" });
  });
});

app.get("/logout", (req, res) => {
  delete req.session.activeUserId;
  res.redirect("/");
  return;
});
// ------------- Dashboard page -------------

app.get("/dashboard", (req, res) => {
  const activeUserId = req.session.activeUserId;
  if (!activeUserId) {
    res.redirect("/");
    return;
  }
  // console.log("Request received for dashboard page");

  var output = "";
  queryFunctions.getUserName(activeUserId, (error, results) => {
    if (error) {
      console.error("Error updating user table:", error);
      return;
    }
    // console.log("Query results:", results);
    // console.log(results[0].first_name);
    console.log("Request received for dashboard page");
    output = dashboardScreen
      .replace("{%USER-NAME%}", results[0].first_name)
      .replace("{%NAVBAR%}", navbar)
      .replace("{%USER-ID%}", activeUserId);

    queryFunctions.getUserUpcomingAppointments(
      activeUserId,
      (error, results) => {
        if (error) {
          console.error("Error updating user table:", error);
          return;
        }
        if (results.length === 0) {
          output = output
            .replace("{%APPT-DATE%}", "No")
            .replace("{%DR-NAME%}", "Any Doctor");
          return;
        }
        console.log("Query results:", results);
        const formattedDate = dateFormatter.formatDate(results[0].date);
        output = output
          .replace("{%APPT-DATE%}", formattedDate)
          .replace(
            "{%DR-NAME%}",
            `Dr. ${results[0].doctor_first_name} ${results[0].doctor_last_name}`
          );
      }
    );

    queryFunctions.getDocterDetails((error, results) => {
      if (error) {
        console.error("Error getting doctors:", error);
        return;
      }
      // console.log("Query results:", results);
      var temp = fillTemplate.fillDoctors(results);
      output = output.replace("{%DOCTORS%}", temp);
      res.status(200).send(output);
    });
  });
});

//------------- appointment page -------------

app.get("/appointment", (req, res) => {
  const activeUserId = req.session.activeUserId;
  if (!activeUserId) {
    res.redirect("/");
    return;
  }
  // console.log("Request received for appointment page");
  queryFunctions.getUpcomingAppointments(activeUserId, (error, results) => {
    if (error) {
      console.error("Error getting appointments:", error);
      return;
    }
    // console.log("Query results:", results);
    var temp = fillTemplate.fillAppointment(results);
    var output = appointmentScreen.replace("{%NAVBAR%}", navbar);
    output = output.replace("{%UPCOMING%}", temp);

    queryFunctions.allAppointments(activeUserId, (error, results) => {
      if (error) {
        console.error("Error getting appointments:", error);
        return;
      }
      // console.log("Query results:", results);
      var temp = fillTemplate.fillTable(results);
      output = output.replace("{%HISTORY%}", temp);
      res.status(200).send(output);
    });
  });
});

app.post("/deleteAppointment", (req, res) => {
  // console.log("Request received for deleting appointment");
  console.log(req.body);
  queryFunctions.deleteAppointment(
    req.body.appointment_id,
    (error, results) => {
      if (error) {
        console.error("Error deleting:", error);
        return;
      }
      // console.log("Query results:", results);
      res.status(200).send(results);
    }
  );
});

// ---------- Schedule page -------------

app.get("/booking", (req, res) => {
  const activeUserId = req.session.activeUserId;
  if (!activeUserId) {
    res.redirect("/");
    return;
  }
  // console.log("Request received for booking page");
  var temp = scheduleScreen.replace("{%NAVBAR%}", navbar);
  temp = temp.replace("{%PATIENT-ID%}", activeUserId);
  queryFunctions.getDepartments((error, results) => {
    if (error) {
      console.error("Error getting departments:", error);
      return;
    }
    // console.log("Query results:", results);
    const output = fillTemplate.replaceAppointmentDepartment(temp, results);
    res.status(200).send(output);
  });
});

app.post("/getProvider", (req, res) => {
  // console.log("Request received for getting providers");
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
  // console.log("Request received for getting provider slots");
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
  const activeUserId = req.session.activeUserId;
  // console.log("Request received for booking");
  // console.log(req.body);
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
      // console.log("Query results:", results);
      res.status(200).send(results);
    }
  );
});

// ----------  file upload page -------------
app.get("/files", async (req, res) => {
  const activeUserId = req.session.activeUserId;
  // if not signed in redirect to landing page
  if (!activeUserId) {
    res.redirect("/");
    return;
  }
  console.log("Request received for file upload page");
  var output = uploadScreen.replace("{%NAVBAR%}", navbar);

  const prefix = `${activeUserId}/`;
  let r = await s3.listObjectsV2({ Bucket: BUCKET, Prefix: prefix }).promise();
  let x = r.Contents.map((item) => item.Key);
  
  if (x.length === 0) {
    output = output.replace("{%RECORDS%}", "No Files Uploaded");
  } else {
    var temp = fillTemplate.fillFiles(x);
    output = output.replace("{%RECORDS%}", temp);
  }
  res.status(200).send(output);
});


app.post("/upload", upload.single("file"), async function (req, res, next) {
  console.log(req.file);
  if (!req.file.location) {
    console.log("not uploaded");
    res.send("File not uploaded");
    return;
  }
  res.send("Successfully uploaded " + req.file.location + " location!");
});


app.get("/download/:folder/:filename", async (req, res) => {
  const { folder, filename } = req.params;
  const key = `${folder}/${filename}`; // Construct S3 key including folder

  try {
    let file = await s3.getObject({ Bucket: BUCKET, Key: key }).promise();
    res.attachment(filename); // Set the file name for download
    res.send(file.Body);
  } catch (err) {
    console.error("Error:", err);
    res.status(404).send("File not found");
  }
});

app.get("/delete/:folder/:filename", async (req, res) => {
  const { folder, filename } = req.params;
  const key = `${folder}/${filename}`; // Construct S3 key including folder

  try {
    await s3.deleteObject({ Bucket: BUCKET, Key: key }).promise();
    res.sendStatus(204);
  } catch (err) {
    console.error("Error:", err);
  }
});

// ---------- User profile page -------------
app.get("/user", (req, res) => {
  const activeUserId = req.session.activeUserId;
  if (!activeUserId) {
    res.redirect("/");
    return;
  }
  console.log("Request received for user profile page");
  queryFunctions.getUserDetails(activeUserId, (error, results) => {
    if (error) {
      console.error("Error getting data:", error);
      return;
    }
    // console.log("Query results:", results);
    var output = userScreen.replace("{%NAVBAR%}", navbar);
    output = output.replace("{%USER-ID%}", activeUserId);
    output = output.replace("{%USER-EMAIL%}", results[0].email_id);
    output = output.replace("{%FIRSTNAME%}", results[0].first_name);
    output = output.replace("{%LASTNAME%}", results[0].last_name);
    output = output.replace("{%PHONENUMBER%}", results[0].phone_no);
    res.status(200).send(output);
  });
});

// ---------- doctor authentication -------------

app.get("/docAuthentication", (req, res) => {
  const activeDocId = req.session.activeDocId;
  if (activeDocId) {
    res.redirect("/docDashboard");
    return;
  }
  // console.log("Request received for doctor authentication page");
  res.status(200).send(docAuthenticationScreen);
});

app.post("/docSignIn", (req, res) => {
  // console.log("Request received for doctor sign in page");
  // console.log(req.body);
  req.session.activeDocId = req.body.docid;
  res.status(200).json({ message: "Authentication successful" });
});

app.get("/docLogout", (req, res) => {
  delete req.session.activeDocId;
  // console.log("Request received for doctor logout page");
  res.redirect("/docAuthentication");
});

// ---------- doctor dashboard -------------
app.get("/docDashboard", (req, res) => {
  const activeDocId = req.session.activeDocId;
  // console.log(activeDocId);
  if (!activeDocId) {
    res.redirect("/docAuthentication");
    return;
  }
  // console.log("Request received for doctor dashboard page");

  let output = ""; // Declare output variable here

  queryFunctions.getDoctorName(activeDocId, (error, results) => {
    if (error) {
      console.error("Error getting data:", error);
      return;
    }
    // console.log("Query results:", results);
    output = docDashboardScreen
      .replace("{%DOC-ID%}", activeDocId)
      .replace(
        "{%DOC-NAME%}",
        "Dr " + results[0].first_name + " " + results[0].last_name
      );
  });
  queryFunctions.getDoctorUpcomingAppointments(
    activeDocId,
    (error, results) => {
      if (error) {
        console.error("Error getting data:", error);
        return;
      }
      if (results.length === 0) {
        output = output
          .replace("{%APPT-DATE%}", "No")
          .replace("{%PATIENT-NAME%}", "Any Patient");
      } else {
        console.log("Query results:", results);
        const formattedDate = dateFormatter.formatDate(results[0].date);
        // console.log(formattedDate);
        output = output
          .replace("{%APPT-DATE%}", formattedDate)
          .replace("{%APP-ID%}", results[0].appointment_id)
          .replace(
            "{%PATIENT-NAME%}",
            `${results[0].patient_first_name} ${results[0].patient_last_name}`
          );
      }
    }
  );
  queryFunctions.getAllDoctorUpcomingAppointments(
    activeDocId,
    (error, results) => {
      if (error) {
        console.error("Error getting appointments:", error);
        return;
      }
      var temp = fillTemplate.fillDoctorTable(results);
      output = output.replace("{%HISTORY%}", temp);
      res.status(200).send(output);
    }
  );
});

app.post("/cancelAppointment", (req, res) => {
  // console.log("Request received for canceling appointment");
  // console.log(req.body);
  queryFunctions.deleteAppointment(
    req.body.appointment_id,
    (error, results) => {
      if (error) {
        console.error("Error canceling:", error);
        return;
      }
      res.status(200).send("Appointment canceled");
    }
  );
});

// ------------------ Server ------------------
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Listening to requests on port ${PORT}...`);
});
