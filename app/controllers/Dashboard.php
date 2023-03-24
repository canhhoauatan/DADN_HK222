<?php
class Dashboard
{
    public function index()
    {
        if (!isset($_SESSION['id'])) header("Location:/DADN_HK222");

        $active_left_item = 'dashboard';
        require("./app/views/user/dashboard.php");
    }

    public function control()
    {
        if (!isset($_SESSION['id'])) header("Location:/DADN_HK222");

        $active_left_item = 'control';
        require("./app/views/user/control.php");
    }
}
