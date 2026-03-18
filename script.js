const form = document.getElementById("registrationForm");

form.addEventListener("submit", function(e) {
e.preventDefault();

let isValid = true;

// Inputs
const firstName = document.getElementById("firstName");
const middleName = document.getElementById("middleName");
const lastName = document.getElementById("lastName");
const course = document.getElementById("course");
const password = document.getElementById("password");
const gender = document.getElementsByName("gender");
const terms = document.getElementById("terms");

// Regex
const nameRegex = /^[A-Za-z]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

// Clear errors
document.querySelectorAll(".error").forEach(e => e.textContent = "");

// First Name
if (!nameRegex.test(firstName.value)) {
showError(firstName, "Only letters allowed");
isValid = false;
}

// Middle Name (optional)
if (middleName.value && !nameRegex.test(middleName.value)) {
showError(middleName, "Only letters allowed");
isValid = false;
}
// Last Name
if (!nameRegex.test(lastName.value)) {
showError(lastName, "Only letters allowed");
isValid = false;
}

if (course.value === "") {
showError(course, "Please select a course");
isValid = false;
}

// Password
if (!passwordRegex.test(password.value)) {
showError(password, "Min 8 chars, 1 uppercase, 1 number, 1 special char");
isValid = false;
}

// Gender
let genderSelected = false;
gender.forEach(g => {
if (g.checked) genderSelected = true;
});

if (!genderSelected) {
showError(gender[0], "Select gender");
isValid = false;
}

// Terms
if (!terms.checked) {
showError(terms, "You must accept terms");
isValid = false;
}

// Success
if (isValid) {

    // Save user data
    const user = {
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value
    };

    localStorage.setItem("studentAccount", JSON.stringify(user));

    alert("Registration Successful!");

    // Redirect to login page
    window.location.href = "login.html";
}

// Error function
function showError(input, message) {
const formGroup = input.closest(".form-group");
formGroup.querySelector(".error").textContent = message;
}
});

const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");

passwordInput.addEventListener("input", function() {
    const value = passwordInput.value;
    let strength = 0;

    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[@$!%*?&]/.test(value)) strength++;

    // Update UI
    if (strength === 1) {
        strengthText.textContent = "Weak";
        strengthBar.style.width = "25%";
        strengthBar.style.background = "red";
    } 
    else if (strength === 2) {
        strengthText.textContent = "Fair";
        strengthBar.style.width = "50%";
        strengthBar.style.background = "orange";
    } 
    else if (strength === 3) {
        strengthText.textContent = "Good";
        strengthBar.style.width = "75%";
        strengthBar.style.background = "blue";
    } 
    else if (strength === 4) {
        strengthText.textContent = "Strong";
        strengthBar.style.width = "100%";
        strengthBar.style.background = "green";
    } 
    else {
        strengthText.textContent = "";
        strengthBar.style.width = "0%";
    }
});
function autoCapitalize(input) {
    input.addEventListener("input", function() {
        this.value = this.value
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase());
    });
}

// Apply to fields
autoCapitalize(document.getElementById("firstName"));
autoCapitalize(document.getElementById("middleName"));
autoCapitalize(document.getElementById("lastName"));