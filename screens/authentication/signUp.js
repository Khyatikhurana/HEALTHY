function togglePassword(elementId) {
  var passwordField = document.getElementById(elementId);
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}

function validateSignUpForm() {
  var password = document.getElementById("signUpPassword").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match.");
    return false;
  }

  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  var buttonSignIn = document.getElementById("signin");
 
  buttonSignIn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission or button behavior
    var username = document.getElementById("signInUsername").value;
    var password = document.getElementById("signInPassword").value;

    var user = {
      uname: username,
      upswd: password,
    };

    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          ("Response is ok");
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        // Process the response data as needed
        console.log("Signed in successfully:", data);
        window.location.href = "/dashboard";
        // Show success message or perform other actions based on the response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors or show error messages to the user
      });
  });

  var buttonSignUp = document.getElementById("signup");
  buttonSignUp.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission or button behavior
    validateSignUpForm();

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var password = document.getElementById("signUpPassword").value;

    var newuser = {
      fname: firstName,
      lname: lastName,
      email: email,
      phone: phoneNumber,
      pswd: password,
    };

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newuser),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Response is ok");
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        // Process the response data as needed
        console.log("Signed Up successfully:", data);
        window.location.href = "/dashboard";
        // Show success message or perform other actions based on the response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors or show error messages to the user
      });
  });
});
