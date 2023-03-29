<?php
require_once('./core/model.php');

class User extends Model
{
    public static function TryLogin($username, $password)
    {
        $conn = mysqli_connect("localhost", "root", "", "Latuce");
        mysqli_set_charset($conn, 'utf8');

        $sql = "SELECT * FROM users WHERE username = '$username'";

        $result = mysqli_fetch_array(mysqli_query($conn, $sql));

        if ($result == null || $password != $result['password']) return false;

        $_SESSION['id'] = $result['id'];
        $_SESSION['username'] = $result['username'];
        setcookie('api_key', $result['api_key'], time() + (86400 * 30), "/");
        return true;
    }

    public static function GetAPIKey($id)
    {
        $conn = mysqli_connect("localhost", "root", "", "Latuce");
        mysqli_set_charset($conn, 'utf8');

        $sql = "SELECT * FROM users WHERE id = $id";
        $result = mysqli_fetch_array(mysqli_query($conn, $sql));

        if ($result == null) return;
        return $result['api_key'];
    }
}
