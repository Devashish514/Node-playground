const user = require("../models/user");
const author = require("../models/author");
const { userRegistrationValidation } = require("../validations/user.validation");
const CustomError = require("../utils/errorHandling");
const { signToken, passwordHelper } = require("../utils/helperFunctions");
const { jwtConstants, passwordConstants } = require("../constants/constant");

const register = async (req, res) => {
    try {
        let data = req.body;
        const { error } = userRegistrationValidation(data);

        if (error) throw new CustomError(400, error.details[0].message);

        //hashing password...
        data.password = await passwordHelper.encryptPassword(data.password, passwordConstants.saltRound);
        let createUser;
        if (data.type === "Author") {
            createUser = await author.create(data);
        } else {
            createUser = await user.create(data);
        }

        // generate jwt ,as user gets logged In once registered..
        const token = signToken(
            { userId: createUser._id },
            jwtConstants.secret,
            { algorithm: jwtConstants.algorithm, expiresIn: jwtConstants.expiry });

        if (!token) throw new CustomError(400, "something went wrong..");

        return res.status(201).send({ data: createUser, token: token });
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).send({ msg: error.message });
        }
        console.error(error.message);
        return res.status(500).send({ msg: error.message });
    }
}


module.exports = {
    register
}