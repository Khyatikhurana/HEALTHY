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
    var buttonSignIn = document.getElementById("docSignin");
  
    buttonSignIn.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default form submission or button behavior
      var userid = document.getElementById("signInUsername").value; 
      var password = document.getElementById("signInPassword").value;
  
      if (userid === "" || password === "") {
        alert("Please fill in all required fields for Sign In.");
        return false;
      }
  
      var user = {
        docid: userid,
        docpswd: password,
      };
  
      fetch("/docSignIn", {
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
          window.history.replaceState(null, "", "/docDashboard");
          window.location.href = "/docDashboard";
          // Show success message or perform other actions based on the response
        })
        .catch((error) => {
          alert("Invalid username or password.");
          console.error("Error:", error);
          // Handle errors or show error messages to the user
        });
    });
  
    var buttonSignUp = document.getElementById("docSignup");
    buttonSignUp.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default form submission or button behavior
      validateSignUpForm();
  
      var firstName = document.getElementById("firstName").value;
      var lastName = document.getElementById("lastName").value;
      var department = document.getElementById("department").value;
      var specialization = document.getElementById("specialization").value;
      var email = document.getElementById("emial").value;
      var phoneNumber = document.getElementById("phoneNumber").value;
      var password = document.getElementById("signUpPassword").value;
      var confirmPassword = document.getElementById("confirmPassword").value;
  
      if (
        firstName === "" ||
        username === "" ||
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
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
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