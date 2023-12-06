import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
email: {
    type: String,
    required: true,
    unique: true,
},
username: {
    type: String,
    required: true,
    unique: true,
},
password: {
    type: String,
    required: true,
},
fullName: {
    type: String,
    default: '',
},
bio: {
    type: String,
    default: '',
},
profileImage: {
    type: String,
    default: 'default_profile_image.jpg',
},
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
