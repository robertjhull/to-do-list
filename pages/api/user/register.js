import dbConnect from '../../../utils/dbConnect';

const User = require('../../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res) => {
    const addNewUser = (hashedPassword) => {
        let user = new User({
            username: req.username,
            password: hashedPassword
        })
        user.save()
        .then(user => {
            console.log("Successfully added user!")
            res.json({success: true, username: user.username, id: user._id})
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

export default async function handler(req, res) {

    const { method } = req

    await dbConnect()
  
    if (method === 'POST') {
        try {
            register(req.body, res)
        } catch (error) {
            res.status(400).json({ success: false })
        }
    }
}