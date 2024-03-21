// Register Validation Data

const phoneRegex = /^[\+]?[\(]?(\d{3})[\)]?[\.\,\s-]?(\d{3})[\.\,\s-]?(\d{4})$/;
const userNameRegex = /^(?=[a-zA-Z])([a-zA-Z0-9-_]){3,18}$/;
const passwordRegex = /^(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,32}$/;

const R_Validation_Data = {
    phoneRegex: phoneRegex,
    validatePhone: (phoneNumber) =>
    {
        if (phoneNumber == null)
        {
            return false;
        }
        return phoneRegex.test(phoneNumber.toString());
    },
    dePhoneify: (phoneNumber) => 
    {
        const parts = phoneRegex.exec(phoneNumber);
        return parts.slice(1).join('');
    },
    userNameRegex: userNameRegex,
    validateUserName: (username) =>
    {
        if (username == null)
        {
            return false;
        }
        return userNameRegex.test(username.toString());
    },
    passwordRegex:passwordRegex,
    validatePassword: (pass) =>
    {
        if (pass == null)
        {
            return false;
        }
        return passwordRegex.test(pass.toString());
    },

}

export default R_Validation_Data;