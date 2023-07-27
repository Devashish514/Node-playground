const joi = require('joi');
const { regExp } = require('../constants/regExp');

const userRegistrationValidation = (data) => {
    const schema = joi.object({
        firstName: joi.string().trim().min(3).required(),
        lastName: joi.string().trim().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().required().pattern(new RegExp(regExp.password)),
        phone: joi
            .string().
            pattern(new RegExp(regExp.phone)),
        type: joi.string().required().trim()
    });
    return schema.validate(data);
};

module.exports = {
    userRegistrationValidation
}