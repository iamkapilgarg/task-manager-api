const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const Mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { userOne, userOneId, setupDatabase } = require('../tests/fixtures/db')

beforeEach(setupDatabase)

test('should create task for the user', async() => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'My test task'
        })
        .expect(200)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
})