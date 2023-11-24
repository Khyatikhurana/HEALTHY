// script.js

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

    return true;
}

function validateSignUpForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var about = document.getElementById("about").value;
    var password = document.getElementById("signUpPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (firstName === "" || lastName === "" || email === "" || phoneNumber === "" || about === "" || password === "" || confirmPassword === "") {
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

    return true;
}
