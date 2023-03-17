<?php
$KEY = 'aio_FCEQ25gsMkNIYccZ9X7OG9iXGbQC';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://io.adafruit.com/api/v2/anhtuan123/feeds/yolo-' . $_GET['data'] . '/data/last');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');


$headers = array();
$headers[] = 'X-Aio-Key: ' . $KEY;
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
echo json_encode($result, JSON_UNESCAPED_UNICODE);
