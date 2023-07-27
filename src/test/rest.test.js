const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../index');


describe('POST /register', () => {
    it('should return 201 status Code/ user data', (done) => {
        const data = {
            firstName: "abc",
            lastName: "dbc",
            email: "and@asa.com",
            password: "Password@123",
            phone: "1234567890"
        };

        request(app)
            .post('/api/v1/register')
            .send(data)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('firstName', data.firstName);
                expect(res.body).to.have.property('lastName', data.lastName);
                expect(res.body).to.have.property('email', data.email);
                expect(res.body).to.have.property('password', data.password);
                expect(res.body).to.have.property('phone', data.phone);

                done();
            });
    });

    it('should return a 400 status code for invalid post data', function (done) {
        // Sending an empty object as post data to simulate an invalid request
        request(app)
            .post('/api/v1/register')
            .send({})
            .expect(400 || 500, done);
    });
});