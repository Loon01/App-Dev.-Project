// components/UserList.js
import React from 'react';
import { Link } from 'react-router-dom';

function UserList({ users, startEdit }) {
  return (
    <>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <strong>Name:</strong> {user.fName} {user.lName}, <strong>Diet Type:</strong> {user.dietType},{' '}
            <strong>Calories per Day:</strong> {user.caloryGoalPerDay}
            <button onClick={() => startEdit(user.userId)}>Edit</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserList;
