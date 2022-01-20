<?php
session_start();

if(isset($_SESSION['username'])){
    if(!empty($_SESSION['username'])){
        $array = array('nom' => $_SESSION["nom"], 'cognom' => $_SESSION["cognom"], 'username' => $_SESSION["username"], 'password' => $_SESSION["password"], 'isAdmin' => $_SESSION["isAdmin"]);
        echo json_encode($array);
    }
}
?>