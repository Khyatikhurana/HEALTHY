function togglePassword(elementId) {
  var passwordField = document.getElementById(elementId);
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}

function validateSignInForm() {
  var username = document.getElementById("signInUsername").value;
  var password = document.getElementById("signInPassword").value;

  if (username === "" || password === "") {
    alert("Username and password are required for sign in.");
    return false;
  }

  var user = {
    uname: username,
    upswd: password,
  };

  fetch("/authentication", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "request-purpose": "login",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      // Process the response data as needed
      console.log("Appointment scheduled successfully:", data);
      // Show success message or perform other actions based on the response
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors or show error messages to the user
    });
}

function validateSignUpForm() {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var about = document.getElementById("about").value;
  var password = document.getElementById("signUpPassword").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  if (
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    phoneNumber === "" ||
    about === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("All fields are required for sign up.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match.");
    return false;
  }

  // Basic email format validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email format.");
    return false;
  }

  var newuser = {
    fname: firstName,
    lname: lastName,
    email: email,
    phone: phoneNumber,
    about: about,
    pswd: password,
  };

  fetch("/authentication", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "request-purpose": "signup",
    },
    body: JSON.stringify(newuser),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      // Process the response data as needed
      console.log("Appointment scheduled successfully:", data);
      // Show success message or perform other actions based on the response
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors or show error messages to the user
  });
}
