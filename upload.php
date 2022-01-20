<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');

if ( 0 != $_FILES['file']['error'] ) {
    echo 'Error: ' . $_FILES['file']['error'] . '<br>';
}
else {
    $path = 'img/experiencias/uploads/';
    $file = $path . $_FILES['file']['name'];
    move_uploaded_file($_FILES['file']['tmp_name'], $file);
    echo $_FILES['file']['name'];
}

?>