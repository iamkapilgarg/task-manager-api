const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const Mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userOneId = new Mongoose.Types.ObjectId
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.io',
    age: 30,
    password: 'kaku7040',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async() => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should I sign up a new user', async() => {
    await request(app).post('/users').send({
        name: 'Andrew',
        email: 'andrew2@med.io',
        age: 30,
        password: 'kaku7040'
    }).expect(201)
})

test('Shuould login existing user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Shuould not login non-existing user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'abcd12345'
    }).expect(400)
})

test('Shuould get profile of the user', async() => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Shuould not get profile of the unauthorized user', async() => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Shuould delete account of a user', async() => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Shuould not delete account of a unauthorized user', async() => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})