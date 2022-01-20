<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Usuario.php');

$contacte = new Usuario();
$response = $contacte->mostrarUsuario();
echo $response;

?>