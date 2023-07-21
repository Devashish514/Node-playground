const joi = require('joi');

const userRegistrationValidation = (data) => {
    const schema = joi.object({
        firstName: joi.string().trim().min(3).required(),
        lastName: joi.string().trim().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().required().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)),
        phone: joi
            .string().
            pattern(new RegExp(/(\d[ -]*)/))
    });
    return schema.validate(data);
};

module.exports = {
    userRegistrationValidation
}