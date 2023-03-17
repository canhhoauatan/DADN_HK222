<?php


abstract class Model
{
    public static function pluralize($singular)
    {
        $last_letter = strtolower($singular[strlen($singular) - 1]);
        switch ($last_letter) {
            case 'y':
                return substr($singular, 0, -1) . 'ies';
            case 's':
                return $singular . 'es';
            default:
                return $singular . 's';
        }
    }

    public static function destroy($id)
    {
        $conn = mysqli_connect("localhost", "root", "", "Fahasa");
        mysqli_set_charset($conn, 'utf8');
        $table_name = self::pluralize(get_called_class());
        $sql = "DELETE from " . $table_name . " WHERE id = $id";
        return mysqli_query($conn, $sql);
    }

    public static function getAll()
    {
        $conn = mysqli_connect("localhost", "root", "", "Fahasa");
        mysqli_set_charset($conn, 'utf8');
        $table_name = self::pluralize(get_called_class());
        $sql = "SELECT * from " . $table_name;
        return mysqli_query($conn, $sql);
    }

    public static function getByID($id)
    {
        $conn = mysqli_connect("localhost", "root", "", "Fahasa");
        mysqli_set_charset($conn, 'utf8');
        $table_name = self::pluralize(get_called_class());
        $sql = "SELECT * from " . $table_name . " WHERE id = " . $id;
        return mysqli_fetch_array(mysqli_query($conn, $sql));
    }

    public static function getByUserID($id)
    {
        $conn = mysqli_connect("localhost", "root", "", "Fahasa");
        mysqli_set_charset($conn, 'utf8');
        $table_name = self::pluralize(get_called_class());
        $sql = "SELECT * from " . $table_name . " WHERE user_id = " . $id;
        return mysqli_query($conn, $sql);
    }

    public static function deleteByUserID($id)
    {
        $conn = mysqli_connect("localhost", "root", "", "Fahasa");
        mysqli_set_charset($conn, 'utf8');
        $table_name = self::pluralize(get_called_class());
        $sql = "DELETE from " . $table_name . " WHERE user_id = " . $id;
        return mysqli_query($conn, $sql);
    }
}
