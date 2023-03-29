<?php
require_once('./app/models/User.php');
require_once('./app/models/Sensor.php');

class SensorController
{
    public function getSensorData()
    {
        $type = $_POST['type'];
        $key = $_COOKIE['api_key'];
        $result = Sensor::GetData($type, $key);

        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }

    public function createSensorData()
    {
        $type = $_POST['type'];
        $value = $_POST['value'];
        $key = $_COOKIE['api_key'];

        Sensor::CreateData($type, $value, $key);
    }
}
