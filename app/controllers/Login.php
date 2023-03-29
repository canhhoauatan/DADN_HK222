<?php
require_once('./app/models/User.php');

class Login
{
    public function index()
    {
        session_start();
        if (isset($_SESSION['id'])) {
            header("Location:/DADN_HK222/dashboard");
        } else {
            require("./app/views/client/login.php");
        }
    }

    public function login()
    {
        session_start();
        if (isset($_POST['username']) && isset($_POST['password'])) {
            $username = $_POST['username'];
            $password = $_POST['password'];

            echo User::TryLogin($username, $password);
        }
    }

    public function logout()
    {
        session_start();
        unset($_SESSION['id']);
        unset($_SESSION['username']);
        setcookie("api_key", "", time() - 3600);
        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }

    public function register()
    {
        require("./app/views/client/register.php");
    }

    public function resetPassword()
    {
        require("./app/views/client/reset_password.php");
    }

    public function forgotPassword()
    {
        require("./app/views/client/forgot_password.php");
    }
}
