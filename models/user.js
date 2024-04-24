import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Check if the model has already been defined
const User = mongoose.models.User || model('User', userSchema);

export default User;
