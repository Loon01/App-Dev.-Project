<?php
session_start();
require 'functions.php';

// cookie
if (isset($_COOKIE['id']) && isset($_COOKIE['key'])) {
$id = $_COOKIE['id'];
$key = $_COOKIE['key'];

// username 
$result = mysqli_query($connect, "SELECT username 
                                FROM user
                                WHERE id = $id;
                                ");
$row = mysqli_fetch_assoc($result);

// username to cookie
if ($key === hash('sha256', $row['username'])) {
    $_SESSION['login'] = true;
}
}

if (isset($_SESSION["login"])) {
header("Location: index.php");
exit;
}

if (isset($_POST['login'])) {

$username = $_POST["username"];
$password = $_POST["password"];

// check username
$result = mysqli_query($connect, "SELECT * FROM user
                                    WHERE username = '$username'
                                    ");

if (mysqli_num_rows($result) === 1) {
    // check password
    $row = mysqli_fetch_assoc($result);
    if (password_verify($password, $row["password"])) {
        // check session
        $_SESSION["login"] = true;

        // check remember me
        if (isset($_POST["remember"])) {
            // cookie
            setcookie('id', $row['id'], time() + 60);
            setcookie('key', hash('sha256', $row['username']), time() + 60);
        }

        header("Location: index.php");
        exit;
    }
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