import dbConnect from '../../../utils/dbConnect';

const User = require('../../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

export default async function handler(req, res) {

    const { method } = req

    await dbConnect()

    if (method === 'POST') {
        try {
            await User.findOne({
                username: { $eq: req.body.username }
            })
            .then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password, function(err, result) {
                        if (err) { res.json({ error: err }) }
                        else if (result) {
                            console.log("successfully logged in", user._id)
                            res.json(user) // this appears to do nothing?
                            console.log("sent response")
                        }
                        else { console.log("Something went wrong") }
                    })
                } else {
                    console.log("No user found")
                }
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    }
}