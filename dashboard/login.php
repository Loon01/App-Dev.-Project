<?php
session_start();
require 'functions.php';

// Cookie
if (isset($_COOKIE['id']) && isset($_COOKIE['key'])) {
$id = $_COOKIE['id'];
$key = $_COOKIE['key'];

// Fetch user data
$user = $collection->findOne(['_id' => new MongoDB\BSON\ObjectId($id)]);
if ($user) {
    // Check username and set session
    if ($key === hash('yurr420', $user['username'])) {
        $_SESSION['login'] = true;
    }
}
}

// Redirect if already logged in
if (isset($_SESSION["login"])) {
header("Location: index.php");
exit;
}

if (isset($_POST['login'])) {
$username = $_POST["username"];
$password = $_POST["password"];

// Find user by username
$user = $collection->findOne(['username' => $username]);

if ($user && password_verify($password, $user["password"])) {
    $_SESSION["login"] = true;

    // Remember Me functionality
    if (isset($_POST["remember"])) {
        // Set cookies
        setcookie('id', (string)$user['_id'], time() + 60);
        setcookie('key', hash('sha256', $user['username']), time() + 60);
    }

    header("Location: index.php");
    exit;
}

$error = true;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login</title>
</head>
<body>

<h1>Login</h1>

<?php if (isset($error)) : ?>
<p style="color: red; font-style: italic;">Username / Password required!</p>
<?php endif; ?>

<form action="" method="post">
<label for="username">Username: </label>
<input type="text" name="username" id="username"><br><br>

<label for="password">Password: </label>
<input type="password" name="password" id="password"><br><br>

<label for="remember">Remember me: </label>
<input type="checkbox" name="remember" id="remember"><br><br>

<button type="submit" name="login">Login</button>

<a href="register.php">Don't have an account yet?</a>
</form>

</body>
</html>