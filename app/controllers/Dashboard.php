<?php
class Dashboard
{
    public function index()
    {
        require("./app/views/user/dashboard.php");
    }

    public function control()
    {
        require("./app/views/user/control.php");
    }
}
