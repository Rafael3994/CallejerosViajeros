<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Experiencia.php');

$exp = new Experiencia ();
$response = $exp->updateReporte($_REQUEST['idCard']);
echo $response;
?>