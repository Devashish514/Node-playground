// Constant RegExp ...


const regExp = {
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    phone: /(\d[ -]*)/,
    mongoId: /^[0-9a-fA-F]{24}$/
}

module.exports = {
    regExp
}