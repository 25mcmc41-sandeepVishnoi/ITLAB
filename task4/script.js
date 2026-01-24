function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dob = document.getElementById("dob").value;
    var phone = document.getElementById("phone").value;

    var valid = true;

    // name validation
    if (!/^[A-Za-z ]+$/.test(name)) {
        document.getElementById("nameError").innerHTML = "only alphabet allowed";
        valid = false;
    } else {
        document.getElementById("nameError").innerHTML = "";
    }

    // email validation
    if (!email.includes("@") || !email.includes(".")) {
        document.getElementById("emailError").innerHTML = "invalid email";
        valid = false;
    } else {
        document.getElementById("emailError").innerHTML = "";
    }

    // password validation
    if (password.length < 8) {
        document.getElementById("passError").innerHTML = "password is too short";
        valid = false;
    } else {
        document.getElementById("passError").innerHTML = "";
    }

    // DOB validation
    var birthYear = new Date(dob).getFullYear();
    var currentYear = new Date().getFullYear();
    var age = currentYear - birthYear;

    if (age < 18) {
        document.getElementById("dobError").innerHTML = "you are not 18+";
        valid = false;
    } else {
        document.getElementById("dobError").innerHTML = "";
    }

    // phone validation
    if (!/^[0-9]{10}$/.test(phone)) {
        document.getElementById("phoneError").innerHTML = "please enter 10 digit number";
        valid = false;
    } else {
        document.getElementById("phoneError").innerHTML = "";
    }

    if (valid) {
        alert("Form submitted successfully");
    }

    return valid;
}

//here we are checking password strength by using math
function checkStrength() {
    var pass = document.getElementById("password").value;
    var strength = 0;

    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;

    var percent = Math.floor((strength / 5) * 100);

    var text = "Strength: " + percent + "%";

    if (percent < 40)
        text += " (Weak)";
    else if (percent < 80)
        text += " (Medium)";
    else
        text += " (Strong)";

    document.getElementById("strength").innerHTML = text;
}
