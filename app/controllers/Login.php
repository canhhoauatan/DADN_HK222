<?php
require_once('./app/models/User.php');

class Login
{
    public function index()
    {
        if (isset($_SESSION['id'])) {
            header("Location:/DADN_HK222/dashboard");
        } else {
            require("./app/views/user/login.php");
        }
    }

    public function login()
    {
        if (isset($_POST['username']) && isset($_POST['password'])) {
            $username = $_POST['username'];
            $password = $_POST['password'];

            echo User::TryLogin($username, $password);
        }
    }

    public function logout()
    {
        unset($_SESSION['id']);
        unset($_SESSION['username']);
        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }

    public function register()
    {
        require("./app/views/user/register.php");
    }

    public function resetPassword()
    {
        require("./app/views/user/reset_password.php");
    }

    public function forgotPassword()
    {
        require("./app/views/user/forgot_password.php");
    }
}
