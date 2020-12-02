const { json } = require("body-parser")

let validateRegister = (jsonObj) => {
    let errors = {};
    if (!jsonObj.firstName || !jsonObj.lastName || !jsonObj.email || !jsonObj.type) {
        errors.emptyFields = "One or more fields are empty";
    }
    if (!jsonObj.email.includes("@gmail") && !jsonObj.email.includes("@yahoo")) {
        errors.email = "Email has an invalid format!";
    }

    return errors;
}

module.exports = validateRegister;