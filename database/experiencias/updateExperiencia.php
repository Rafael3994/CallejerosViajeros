<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Experiencia.php');

$exp = new Experiencia ();
$response = $exp->updateExperiencia($_REQUEST['idCard'], $_REQUEST['newTitulo'], $_REQUEST['newFecha'], $_REQUEST['newTexto'], $_REQUEST['newImg']);
echo $response;
?>