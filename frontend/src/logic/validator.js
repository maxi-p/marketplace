const validateRegister = (obj) =>
{
    const fName = obj.firstname;
    const lName = obj.lastname;
    const user  = obj.username;
    const pass  = obj.password;
    const email = obj.email;
    const phone = obj.phoneNumber;

    var fNameMessage = "";
    var lNameMessage = "";
    var userMessage  = "";
    var passMessage  = "";
    var mailMessage = "";
    var phoneNumberMessage = "";
    var statusMsg = "valid";

    // Empty input
    if (fName === "") {
        fNameMessage = "First name cannot be blank.";
        statusMsg = "invalid";
    }
    if (lName === "") {
        lNameMessage = "Last Name cannot be blank.";
        statusMsg = "invalid";
    }
    if (user === "") {
        userMessage = "Username cannot be blank.";
        statusMsg = "invalid";
    }
    if (pass === "") {
        passMessage = "Password cannot be blank.";
        statusMsg = "invalid";
    }
    if (email === "") {
        mailMessage = "Email cannot be blank.";
        statusMsg = "invalid";
    }
    if (phone === "") {
        phoneNumberMessage = "Phone cannot be blank.";
        statusMsg = "invalid";
    }

    // Regexes
    var userNameRegex = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]).{3,18}$/;
    if (userMessage !== "Username cannot be blank." && userNameRegex.test(user) === false) {
        userMessage = "Username must be 4-18 characters and start with a character.";
        statusMsg = "invalid";
    }

    var passwordRegex = /(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,32}/;
    if (passMessage !== "Password cannot be blank." && passwordRegex.test(pass) === false) {
        passMessage = "Passwords must be 8-32 long, with at least 1 digit, 1 letter, 1 special character.";
        statusMsg = "invalid";
    }

    var phoneRegex = /^[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/;
    if (phoneNumberMessage !== "Phone cannot be blank."  && phoneRegex.test(phone) === false) {
        phoneNumberMessage = "A US phone must be 10 digits (without +1).";
        statusMsg = "invalid";
    }

    var emailRegex = /^([a-zA-Z0-9_\-]+)@([a-zA-Z0-9_\-]+)\.([a-zA-Z]{2,5})$/;
    if (mailMessage !== "Email cannot be blank." && emailRegex.test(email) === false) {
        mailMessage = "Email must be in the form address@domain.";
        statusMsg = "invalid";
    }

    // result
    const result = {
        firstNameMessage: fNameMessage,
        lastNameMessage: lNameMessage,
        userNameMessage: userMessage,
        passwordMessage: passMessage,
        emailMessage: mailMessage,
        phoneMessage: phoneNumberMessage,
        status: statusMsg
    };
    return result;
};

export default validateRegister;