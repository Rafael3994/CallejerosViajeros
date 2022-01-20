<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Experiencia.php');

$exp = new Experiencia ();

$var = $exp->anadirExp($_REQUEST["titol"], $_REQUEST["text"], $_REQUEST["imatge"], $_REQUEST["coordenades"], $_REQUEST["categoria"], $_REQUEST["username"]);

?>