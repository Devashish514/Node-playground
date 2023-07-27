// helper functions ..
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CustomError = require('./errorHandling');

// function to sign a jwt token for a user payload

function signToken(data, secret, options) {  // data = {userData} options = {expiry, algorithm (optional)}
    return jwt.sign(data, secret, options);
}

//function to verify token for authorization

function verifyToken(token, secret) {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            throw new CustomError(401, `Unauthorized : ${err.message}`);
        }
    }
}

const passwordHelper = {
    encryptPassword: async (password, saltRound) => {
        try {
            const hash = await bcrypt.hash(password, saltRound);
            return hash;
        } catch (err) {
            throw new CustomError(400, `Error occurred while hashing the password : ${err.message} .`);
        }
    },
    decryptPassword: async (password, encryptPassword) => {
        try {
            return await bcrypt.compare(password, encryptPassword);
        } catch (err) {
            throw new CustomError(400, `Error occurred while hashing the password : ${err.message}.`);
        }
    }
}

function isEmptyObject(obj) {
    try {
        return Object.keys(obj).length === 0;
    } catch (err) {
        throw new CustomError(400, `Error : ${err.message}`);
    }
}

module.exports = {
    signToken,
    verifyToken,
    passwordHelper,
    isEmptyObject

};