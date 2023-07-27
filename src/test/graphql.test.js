const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../index');


describe(`GraphQL API Test`, () => {
    it('Should return 200 OK and All Blogs Data', (done) => {
        const url = "http://localhost:3000/graphql"
        const query = `
        query {
            getBlogs{ _id author{ firstName } title description metaTags }
          }
        `
        request(app)
            .post('/graphql')
            .send({ query: query })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { data, errors } = res.body;
                expect(data.getBlogs).to.be.an('object');
                done();
            });
    });
});
