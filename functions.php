<?php
// Connect to database
$host     = "localhost";
$username = "root";
$password = "";
$database = "food_recipe";

$connect = mysqli_connect($host, $username, $password, $database);

// check connection
if (!$connect) {
die("connection error: " . mysqli_connect_error());
}


// Registration Function

function registrasi($data)
{
global $connect;

$username = strtolower(stripslashes($data["username"]));
$password = mysqli_real_escape_string($connect, $data["password"]);
$password2 = mysqli_real_escape_string($connect, $data["password2"]);

// check if username exist
$result = mysqli_query($connect, "SELECT username
                                    FROM user 
                                    WHERE username = '$username'
                                    ");

if (mysqli_fetch_assoc($result)) {
    echo "<script>
            alert('Username already exists');
            </script>";
    return false;
}

// check password confirmation
if ($password !== $password2) {
    echo "<script>
            alert('Confirmed password is incorrect');
            </script>";
    return false;
}

// encrypt password
$password = password_hash($password, PASSWORD_DEFAULT);

// add user to db
mysqli_query($connect, "INSERT INTO user VALUES('', '$username', '$password')");

return mysqli_affected_rows($connect);
}

// Registration Function