// Constant Values...

const jwtConstants = {
    secret: "Secret",
    expiry: 160000,
    algorithm: 'HS256'
}

const passwordConstants = {
    saltRound: 10
}

module.exports = {
    jwtConstants,
    passwordConstants
}