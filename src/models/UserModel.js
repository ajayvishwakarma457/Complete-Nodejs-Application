const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'A first name is required']
    },
    username: {
        type: String,
        required: [true, 'A user name is required'],
        unique: [true, 'user name should be unique']
    },
    email: {
        type: String,
        required: [true, 'A email is required'],
        unique: [true, 'user email should be unique']
    },
    phone: {
        type: String,
        required: [true, 'A phone is required']
    },
    password_hash: {
        type: String,
        required: true
    },
    biography: {
        type: String
    },
    photo: {
        type: String, // This will store the URL or path to the photo
        default: null
    },
    reset_password_token: {
        type: String,
        default: null
    },
    reset_password_expires: {
        type: Date,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date,
        default: Date.now
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;