// EditUser.js
import React from 'react';

function EditUser({ newUser, handleInputChange, updateUser }) {
  return (
    <>
      <h2>User Information</h2>
      <div>
        <label>First Name:</label>
        <input type="text" name="fName" value={newUser.fName} onChange={handleInputChange} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="lName" value={newUser.lName} onChange={handleInputChange} />
      </div>
      <div>
        <label>Diet Type:</label>
        <input type="text" name="dietType" value={newUser.dietType} onChange={handleInputChange} />
      </div>
      <div>
        <label>Calories per Day:</label>
        <input type="number" name="caloryGoalPerDay" value={newUser.caloryGoalPerDay} onChange={handleInputChange} />
      </div>
      <button onClick={updateUser}>Update User</button>
    </>
  );
}

export default EditUser;
