const joi = require('joi');
const { regExp } = require('../constants/regExp');

const blogsInputValidation = (data) => {
    const schema = joi.object({
        title: joi.string().trim().min(3).required(),
        description: joi.string().trim().min(3).required(),
        metaTags: joi.array(),
        author: joi.string().required().pattern(new RegExp(regExp.mongoId)),
    });
    return schema.validate(data);
};

module.exports = {
    blogsInputValidation
}