<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Experiencia.php');

$exp = new Experiencia ();
$experiencias = $exp->mostrarEsbozos();
echo json_encode($experiencias);
?>