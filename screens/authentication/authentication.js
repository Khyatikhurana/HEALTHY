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

    if (username === "" || password === "") {
      alert("Please fill in all required fields for Sign In.");
      return false;
    }

    var user = {
      username: username,
      userpswd: password,
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
        window.history.replaceState(null, "", "/dashboard");
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
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phoneNumber === "" ||
      signUpPassword === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill in all required fields for Sign Up.");
      return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format.");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return false;
    }

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
        window.history.replaceState(null, "", "/dashboard");
        window.location.href = "/dashboard";
        // Show success message or perform other actions based on the response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors or show error messages to the user
      });
  });
});

// theme toggle

document.querySelector(".theme-toggle").addEventListener("click", () => {
  toggleLocalStorage();
  toggleRootClass();
});

function toggleRootClass() {
  const current = document.documentElement.getAttribute("data-bs-theme");
  const inverted = current == "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-bs-theme", inverted);
}

function toggleLocalStorage() {
  if (isLight()) {
    localStorage.removeItem("light");
  } else {
    localStorage.setItem("light", "set");
  }
}

function isLight() {
  return localStorage.getItem("light");
}

if (isLight()) {
  toggleRootClass();
}
