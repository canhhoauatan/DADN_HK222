<?php

$KEY = 'aio_YmPB706PI1ebTejIFEzKCMZX3MSU';
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://io.adafruit.com/api/v2/anhtuan123/feeds/yolo-' . $_POST['type'] . '/data');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'value=' . $_POST['value']);

$headers = array();
$headers[] = 'X-Aio-Key: ' . $KEY;
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close($ch);
