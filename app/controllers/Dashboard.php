<?php
class Dashboard
{
    public function index()
    {
        session_start();
        if (!isset($_SESSION['id'])) header("Location:/DADN_HK222");

        $active_left_item = 'dashboard';
        require("./app/views/client/dashboard.php");
    }

    public function control()
    {
        session_start();
        if (!isset($_SESSION['id'])) header("Location:/DADN_HK222");

        $active_left_item = 'control';
        require("./app/views/client/control.php");
    }
}
