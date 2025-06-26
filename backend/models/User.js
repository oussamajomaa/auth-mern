import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        default: 'user'
    },
    token: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema)
export default User
// export default mongoose.model('User', userSchema)
