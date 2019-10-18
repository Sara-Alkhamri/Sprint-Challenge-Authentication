const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
    const creds = {
        username: 'sara',
        password: 'pass'
    }

    const newCreds = {
        username: `${Date.now()}`,
        password: `${Date.now()}`
    }
    //two tests for login
    describe('login route', () => {
        it('should return a status code of 201', () => {
            return request(server)
            .post('/api/auth/login')
            .send(creds)
            .expect(201)
        })
        it('is a JSON Object', () => {
            return request(server)
              .post('/api/auth/login')
              .send(creds)
              .then(res => {
                expect(res.type).toMatch(/json/i)
              });
          });
    })
    //two tests for register
    describe('register route', () => {
        it('it should return a status of 201', () => {
            return request(server).post('/api/auth/register')
                .send(newCreds)
                .expect(201) 
        })

        it('is a JSON Object', () => {
            return request(server)
              .post('/api/auth/register')
              .send(creds)
              .then(res => {
                expect(res.type).toMatch(/json/i)
              });
          });
    })  

    //get all jokes
    describe('jokes route', () => {
        it('should return jokes with auth', () => {
            return request(server).get('/api/jokes')
                .then(res => {
                    expect(res.body);
                })
        })
        it('should 500', () => {
            return request(server).get('/joke')
                .expect(404)
        })
    })
})
    