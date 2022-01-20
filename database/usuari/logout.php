<?php
session_start();

if(isset($_SESSION['username'])){
    if(!empty($_SESSION['username'])){
        session_unset();
        session_destroy();
        echo json_encode("OK");
    }
}
?>