let validateProduct = (json) => {
    let errors = {};
    if (!json.name || !json.expireDate || !json.brand || !json.price || !json.count) {
        errors.emptyFields = "One or more required fields are empty!";
    }

    return errors;
}

module.exports = validateProduct;