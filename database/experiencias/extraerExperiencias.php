<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Experiencia.php');

$exp = new Experiencia();

if (isset($_REQUEST['categoria'])) {
    $categoria = $_REQUEST['categoria'];
    if(!empty($categoria)){
        echo json_encode($exp->getExperiencias($categoria));
    }
}

// Si existe setNavegador quiere decir que es la primera vez que se accede a la pagina y por lo tanto se crea el navegador entre paginas
if (isset($_REQUEST['setNavegador'])) {
    $categoria = $_REQUEST['setNavegadorCategoria'];
    if(!empty($categoria)){
        echo $exp->setNavegadorPaginas($categoria);
    }
}


// Si existe "page" quiere decir que el usuario quiere cambiar de pagina
if (isset($_REQUEST['page'])) {
    $page = $_REQUEST['page'];
    $categoria = $_REQUEST['pageCategoria'];
    if(!empty($categoria) && !empty($page)){
        echo json_encode($exp->muestraOtraPagina($page, $categoria));
    }
}

?>