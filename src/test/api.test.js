const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../index');

describe('POST /register', () => {
    it('should return 200 status Code/ user data', (done) => {
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
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.be.an('object');
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

describe(`GraphQL API Test`, () => {
    it('Should return 200 OK and User Data', (done) => {
        const url = "http://localhost:3000/graphql"
        const query = `
        mutation {
            createUser(firstName: "John Doe", email: "john@example.com", lastName: "asas", password:"Password@123", phone:"1234566654") {
              firstName
              lastName
              email
              password
              phone
            }
          }
        `
        request(app)
            .post('/graphql')
            .send({ query: query })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { data, errors } = res.body;
                expect(data.createUser).to.be.an('object');
                done();
            });
    });
});
