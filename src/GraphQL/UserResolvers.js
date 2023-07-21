const { userRegistrationValidation } = require("../validations/userInputValidation");

//GraphQL API Resolver
const root = {
    createUser: ({ firstName, lastName, email, password, phone }) => {
        const user = { firstName, lastName, email, password, phone }
        const { error } = userRegistrationValidation(user);

        if (error) {
            throw new Error(error.details[0].message);
        }
        return user;
    }
}


module.exports = {
    root
}   