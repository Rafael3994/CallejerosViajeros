<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Categoria.php');

$categoria = new Categoria ();
$var = $categoria->insertCategoria($_REQUEST['nom']);
?>