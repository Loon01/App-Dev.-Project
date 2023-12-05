<?php
// Connect to database
$mongoClient = new MongoDB\Client("mongodb: ");
$database = $mongoClient->food_recipe;
$collection = $database->user;

// Check if connection is successful
try {
if ($mongoClient) {
echo "Connected to MongoDB successfully!";
// Now proceed with other operations using $collection
} else {
echo "Failed to connect to MongoDB.";
}
} catch (MongoDB\Driver\Exception\Exception $e) {
echo "MongoDB Exception: " . $e->getMessage();
}


// Registration Function
function registrasi($data, $collection)
{
$username = strtolower($data["username"]);
$password = $data["password"];
$password2 = $data["password2"];

// Check if username exists
$result = $collection->findOne(['username' => $username]);
if (!empty($result)) {
    echo "<script>alert('Username already exists');</script>";
    return false;
}

// Check password confirmation
if ($password !== $password2) {
    echo "<script>alert('Confirmed password is incorrect');</script>";
    return false;
}

// Encrypt password
$password = password_hash($password, PASSWORD_DEFAULT);

// Add user to MongoDB
$userDocument = [
    'username' => $username,
    'password' => $password
];
$insertResult = $collection->insertOne($userDocument);

return $insertResult->getInsertedCount();
}

// Usage
$data = [
'username' => 'example_user',
'password' => 'example_password',
'password2' => 'example_password'
];

$result = registrasi($data, $collection);
if ($result) {
echo "User registered successfully!";
} else {
echo "Failed to register user.";
}