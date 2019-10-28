const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOne, userOneId, setupDatabase } = require('../tests/fixtures/db')

beforeEach(setupDatabase)

test('Should I sign up a new user', async() => {
    const response = await request(app).post('/users').send({
        name: 'Andrew',
        email: 'andrew2@med.io',
        age: 30,
        password: 'kaku7040'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'Andrew',
            email: 'andrew2@med.io'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('kaku7040')
})

test('Shuould login existing user', async() => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)
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

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Shuould not delete account of a unauthorized user', async() => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Shuould upload avatar image', async() => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpeg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Shuould update valid user details', async() => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'kapil'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('kapil')
})

test('Shuould not update invalid user details', async() => {
    await request(app)
        .patch('/users/me')
        .send({
            name: 'kapil'
        })
        .expect(401)

    const user = await User.findById(userOneId)
    expect(user.name).not.toEqual('kapil')
})