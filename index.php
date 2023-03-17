<?php
require_once('core/router.php');

$router = new Router();

//Login
$router->add('', ['controller' => 'Authenticator', 'action' => 'login']);
$router->add('login', ['controller' => 'Authenticator', 'action' => 'login']);
$router->add('register', ['controller' => 'Authenticator', 'action' => 'register']);
$router->add('forgot-password', ['controller' => 'Authenticator', 'action' => 'forgotPassword']);
$router->add('reset-password', ['controller' => 'Authenticator', 'action' => 'resetPassword']);
// Dashboard
$router->add('dashboard', ['controller' => 'Dashboard', 'action' => 'index']);
$router->add('control', ['controller' => 'Dashboard', 'action' => 'control']);

$router->dispatch($_SERVER['QUERY_STRING']);
