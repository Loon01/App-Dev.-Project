import UserModel from './userModel.js';

const registerUser = (userData) => {
  const newUser = new UserModel(userData);
  return newUser.save();
};

const loginUser = (username, password) => {
  return UserModel.findOne({ username, password });
};

const searchUser = (username) => {
  return UserModel.findOne({ username });
};

export {
  registerUser,
  loginUser,
  searchUser,
};