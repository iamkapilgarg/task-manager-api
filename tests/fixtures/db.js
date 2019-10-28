const Mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')

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

const userTwoId = new Mongoose.Types.ObjectId
const userTwo = {
    _id: userTwoId,
    name: 'Sanyu',
    email: 'sanyu@example.io',
    age: 30,
    password: 'kaku7030',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const setupDatabase = async() => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
}