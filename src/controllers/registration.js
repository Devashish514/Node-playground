const { userRegistrationValidation } = require("../validations/userInputValidation");

// REST API
const register = async (req, res) => {
    try {
        let data = req.body;
        const { error } = userRegistrationValidation(data);
        if (error) return res.status(400).send({ msg: error.details[0].message });
        return res.status(200).send(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    register
}