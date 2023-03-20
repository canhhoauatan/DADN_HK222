<?php
class Dashboard
{
    public function index()
    {
        $active_left_item = 'dashboard';
        require("./app/views/user/dashboard.php");
    }

    public function control()
    {
        $active_left_item = 'control';
        require("./app/views/user/control.php");
    }
}
