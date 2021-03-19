import { Mongoose } from 'mongoose'

const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: [true],
        minLength: 5,
        maxLength: 20
    },
    password: {
        type: String,
        required: [true],
        minLength: 5,
        maxLength: 20
    }
})

export default Mongoose.models.User || Mongoose.model('User', UserSchema)