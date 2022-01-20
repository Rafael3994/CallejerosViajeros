<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <?php include("includes/includes.inc") ?>
    <title>Index</title>
    <script src="./js/index.js"></script>
    <link rel="stylesheet" href="./css/style.css">
</head>

<body>
    <header id="headhead" class="header">
        <button type="button" id="sidebarCollapse" class="btn btn-primary btn-toggle-sidebar">
            <i class="fas fa-sign-in-alt"></i>
            <span>Log in !</span>
        </button>
        <div class="containerImage">
            <img src="./img/trip.png" class="banner">
            <div class="middle">
                <div class="textContainer">
                    <span class="text">
                        Callejeros Viajeros
                    </span>
                </div>
            </div>
        </div>
    </header>

    <!-- Full page content -->
    <div class="wrapper">
        <!-- Sidebar -->
        <nav id="sidebar" class="active">
            <!-- Border -->
            <div class="borderAssets" style="display:none">
                <img class="pulpito" src="./img/sidebar/plane.gif" alt="cute pulpito" style="top:20px;"> 
                <span id="borderText" class="borderText">Login / registro</span>
                <img class="pulpito" src="./img/sidebar/plane.gif" alt="cute pulpito" style="top:470px;">
            </div>
            <!-- End border -->

            <!-- Forms -->
            <div id="formsIndex">
                <!-- Login -->
                <ul class="list-unstyled components">
                    <li class="active">
                        <a id="dropDownLogin" href="#desplegableLogin" data-toggle="collapse" aria-expanded="true" class="dropdown-toggle sidebar-header" style="border-radius: 0px 999px 0px 0px;">Login</a>
                        <ul class="collapse list-unstyled" id="desplegableLogin">
                            <li>
                                <?php include("includes/sidebarLogin.php") ?>
                            </li>
                        </ul>
                    </li>
                </ul>
                <!-- End login -->

                <!-- Register -->
                <ul class="list-unstyled components">
                    <li class="active">
                        <a id="dropDownRegistro" href="#desplegableRegistro" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle sidebar-header">Registro</a>
                        <ul class="collapse list-unstyled" id="desplegableRegistro">
                            <li>
                                <?php include("includes/sidebarRegister.php") ?>
                            </li>
                        </ul>
                    </li>
                </ul>
                <!-- End register -->
            </div>
            <!-- End forms -->
        </nav>
        <!-- End sidebar -->

        <!-- Page content -->
        <div id="content" class="container-fluid">
            
            <h1 id="enunciat"></h1>
            
            <div id="panell" style="display: none;">
                <h5 id="benvinguda"></h5>
            </div>

        </div>

        <div id="modalAdminCat"></div>
        <div id="modalAdminExp">
            <div id="modalExp" class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Experiencias</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#esbozos"
                                        role="tab" aria-controls="home" aria-selected="true">Esbozos</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#reportadas" role="tab"
                                        aria-controls="profile" aria-selected="false">Reportadas</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="esbozos" role="tabpanel" aria-labelledby="home-tab">
                                
                                </div>
                                <div class="tab-pane fade" id="reportadas" role="tabpanel" aria-labelledby="profile-tab">
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="modalAdminUser"></div>
        
        <!-- En este div se añade el modal que se crea dinamicamente para cada experiencia (moduleExperiencia: 200)-->
        <div id="divModal"></div>
        <!-- Este modal es la confirmacion de cuando el user va a eliminar una experiencia -->
        <div id="divModalConfirm"></div>
        
    </div>


    <!-- Divisor -->
    <div class="divisor row p-4 px-3 mb-3 d-flex justify-content-between">
        <div>
            <span class="mr-5 font-weight-bold">¿Preparado para tu aventura?</span>
            <span class="d-none d-md-inline-block">Miles de experiencias y millones de buenos recuerdos</span>
        </div>
        <div>
            <span class="d-none d-sm-inline-block">ÚNETE AHORA</span>
        </div>
    </div>
    <!-- End Divisor -->

    <!-- Start footer -->
    <footer class="container-fluid footer">
        <!-- Upper Container -->
        <div class="container-fluid px-0">
            <div class="row">
                <!-- Links -->
                <div class="row col-sm-8 px-0">
                    <!-- Company -->
                    <div class="col col-md-auto mr-5">
                        <h6 class="font-weight-bold footer-ul">¿QUIENES SOMOS?</h6>
                        <ul class="list-unstyled mt-3">
                            <li>
                                <a class="footer-links" href="#">Sobre nosotros</a>
                            </li>
                            <li>
                                <a class="footer-links" href="#">Equipo</a>
                            </li>
                            <li>
                                <a class="footer-links" href="#">Partners</a>
                            </li>
                        </ul>
                    </div>

                    <!-- About -->
                    <div class="col col-md-auto mr-5">
                        <h6 class="font-weight-bold footer-ul">ABOUT</h6>
                        <ul class="list-unstyled mt-3">
                            <li>
                                <a class="footer-links" href="#">Política de privacidad</a>
                            </li>
                            <li>
                                <a class="footer-links" href="#">Política de cookies</a>
                            </li>
                            <li>
                                <a class="footer-links" href="#">FAQ</a>
                            </li>
                        </ul>
                    </div>

                    <!-- Get in touch -->
                    <div class="col col-md-auto mr-5">
                        <h6 class="font-weight-bold footer-ul">
                            CONTACTO
                        </h6>
                        <ul class="list-unstyled mt-3">
                            <li>
                                <a class="footer-links" href="#">Contáctanos</a>
                            </li>
                            <li>
                                <a class="footer-links" href="#">Trabajo</a>
                            </li>
                            <li>
                                <a class="footer-links" href="#">Sede/Localización</a>
                            </li>
                        </ul>
                    </div>

                    <!-- Technical support -->
                    <div class="col col-md-auto">
                        <h6 class="font-weight-bold footer-ul">
                            SOPORTE TÉCNICO
                        </h6>
                        <ul class="list-unstyled mt-3">
                            <li>
                                <a class="footer-links" href="#">¿Incidencias?</a>
                            </li>
                            <li>
                                <a class="footer-links" href="#">Contactar a soporte</a>
                            </li>
                            <li>
                                <a class="footer-links" href="#">Documentación</a>
                            </li>
                            <li>
                                <a class="footer-links" href="#">Reportar un bug</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- End Links -->

                <!-- Media -->
                <div class="col-sm-4 px-0 ml-4">
                    <div class="float-right">
                        <div class="mb-4">
                            <p class="footer-media-title mb-0">
                                INS PEDRALBES
                            </p>
                            <p class="footer-media-text">
                                Proyecto viajes
                            </p>
                        </div>
                        <div>
                            <p class="footer-media-title mb-0">
                                REDES SOCIALES
                            </p>
                            <p class="footer-media-text">
                                Entérate de todo
                            </p>
                        </div>
                        <div class="">
                            <a class="mr-3" href="#"><i class="fab fa-twitter fa-lg text-dark"></i></a>
                            <a class="mr-3" href="#"><i class="fab fa-facebook-f fa-lg text-dark"></i></a>
                            <a href="#"><i class="fab fa-instagram fa-lg text-dark"></i></a>
                        </div>
                    </div>
                </div>
                <!-- End Media -->
            </div>
        </div>
        <!-- End Upper Container -->

        <!-- Lower Container -->
        <div class="container-fluid mt-5 mb-5 px-0">
            <div class="row">
                <div class="col-sm-6 px-0">
                    <p class="mb-0">
                        <span class="mr-2 footer-bottom-grail" style="color: #000F14;">CALLEJEROS</span><span
                            class="footer-bottom-grail" style="color: #BDBDBD;">VIAJEROS</span>
                    </p>
                    <p class="footer-bottom-copyright">
                        &copy; CallejerosViajeros <?php echo date("Y"); ?>. All rights reserved
                    </p>
                </div>
                <div class="col-sm-6 px-0">
                    <p class="footer-bottom-text">
                        FOR TRAVELERS BY TRAVELERS
                    </p>
                </div>
            </div>
        </div>
        <!-- End Lower Container -->
    </footer>
    <!-- End footer -->

    <!-- End full page content -->
    <script src="./js/moduleExperiencia.js"></script>
    <script src="./js/moduleNewExperiencia.js"></script>
    <!-- <script src="./js/moduleCategoria.js"></script> -->

</body>

</html>