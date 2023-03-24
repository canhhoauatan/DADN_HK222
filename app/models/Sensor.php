<?php
require_once('./core/model.php');

class Sensor extends Model
{
    public static function GetData(string $type, string $KEY)
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, 'https://io.adafruit.com/api/v2/anhtuan123/feeds/yolo-' . $type . '/data/last');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');


        $headers = array();
        $headers[] = 'X-Aio-Key: ' . $KEY;
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    public static function CreateData(string $type, string $value, string $KEY)
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, 'https://io.adafruit.com/api/v2/anhtuan123/feeds/yolo-' . $type . '/data');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'value=' . $value);

        $headers = array();
        $headers[] = 'X-Aio-Key: ' . $KEY;
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close($ch);
    }
}
