<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Categoria.php');

$cat = new Categoria ();
$categorias = $cat->selectAllCategorias();
echo json_encode($categorias);
?>