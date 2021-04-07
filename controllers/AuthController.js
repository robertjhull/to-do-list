const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {

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

const login = (req, res) => {
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
                    jwt.sign({user_id: user._id}, 'privatekey', { expiresIn: '1h' },(err, token) => {
                        if(err) { console.log(err) }
                        user.token = token
                        res.send(user.token)
                    });
                    console.log("login successful")
                } else {
                    console.log("something went wrong")
                }
            })
            return user;
        } else {
            console.log("no user found")
        }
    })
}

module.exports = { register, login }