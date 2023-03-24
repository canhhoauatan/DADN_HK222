<?php
require_once('core/router.php');

$router = new Router();

$conn = mysqli_connect("localhost", "root", "", "Latuce");
mysqli_set_charset($conn, 'utf8');
session_start();

//Login
$router->add('', ['controller' => 'Login', 'action' => 'index']);
$router->add('login', ['controller' => 'Login', 'action' => 'index']);
$router->add('login/login_process', ['controller' => 'Login', 'action' => 'login']);
$router->add('login/logout_process', ['controller' => 'Login', 'action' => 'logout']);
$router->add('register', ['controller' => 'Login', 'action' => 'register']);
$router->add('forgot-password', ['controller' => 'Login', 'action' => 'forgotPassword']);
$router->add('reset-password', ['controller' => 'Login', 'action' => 'resetPassword']);

// Dashboard
$router->add('dashboard', ['controller' => 'Dashboard', 'action' => 'index']);
$router->add('control', ['controller' => 'Dashboard', 'action' => 'control']);

// Sensor
$router->add('get_data', ['controller' => 'SensorController', 'action' => 'getSensorData']);
$router->add('create_data', ['controller' => 'SensorController', 'action' => 'createSensorData']);



$router->dispatch($_SERVER['QUERY_STRING']);
