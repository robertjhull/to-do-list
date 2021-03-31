const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req) => {

    const addNewUser = (hashedPassword) => {
        let user = new User({
            username: req.username,
            password: hashedPassword
        })
        user.save()
        .then(user => {
            console.log("Successfully added user!")
        })
        .catch(error => {
            console.log(error)
        })

        return user;
    }

    bcrypt.hash(req.password, 10, function(err, hashed) {
        if (err) {
            res.json({
                error: err
            })
        }
        addNewUser(hashed)
    })
}

const login = (req) => {
    User.findOne({
        username: { $eq: req.username }
    })
    .then(user => {
        if (user) {
            bcrypt.compare(req.password, user.password, function(err, result) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                if (result) {
                    let token = jwt.sign(
                        {username: user.username}, 
                        'verySecretValue',
                        {expiresIn: '1hr'}
                    )
                    console.log("login successful")
                } else {
                    console.log("something went wrong")
                }
            })
        } else {
            console.log("no user found")
        }
    })
}

module.exports = { register, login }