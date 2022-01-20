<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Usuario.php');

$user = new Usuario();
$response = $user->deleteUser($_REQUEST['username']);
echo $response;
?>