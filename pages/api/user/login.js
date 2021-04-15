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
                            console.log("Successfully logged in ", user._id)
                            res.json({success: true, username: user.username, id: user._id})
                        }
                        else {
                            res.status(400).json({ success: false })
                        }
                    })
                } else {
                    console.log("No user found")
                    res.status(400).json({ success: false })
                }
            })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    }
}