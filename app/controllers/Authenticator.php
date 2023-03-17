<?php

class Authenticator
{
    public function login()
    {
        require("./app/views/user/login.php");
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
