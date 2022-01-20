<?php
session_start();
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Usuario.php');


if(isset($_SESSION['username'])){
    if(!empty($_SESSION['username'])){
        $_SESSION['nom']=$_REQUEST["nombre"];
        $_SESSION['cognom']= $_REQUEST["apellido"];
        $_SESSION['username']=$_REQUEST["username"];
        $_SESSION['password']=$_REQUEST["password"];
    }
}



$contacte = new Usuario();
$response = $contacte->updateInformacionUsuario($_REQUEST["username"], $_REQUEST["nombre"], $_REQUEST["apellido"], $_REQUEST["password"]);
echo $response;
?>