const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    dietType: {
        type: String,
        required: true,
    },
    caloryGoalPerDay: {
        type: Number, 
        required: false,
    },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
