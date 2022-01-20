window.onload = function () {

    var logeado = false;
    var nom = "";
    var cognom = "";
    var password = "";
    var username = "";
    var isAdmin = false;


    // Axios que verifica si hay una sesion iniciada y si la hay recupera las credenciales.
    axios.get('./database/usuari/isLogged.php')
    .then(function (respuesta) {
        setSidebar();
        // Si devuelve credenciales quiere decir que ya habia sesion y muestra la vista de logeado
        if(respuesta.data != ""){
            logeado = true;
            nom = respuesta.data.nom;
            cognom = respuesta.data.cognom;
            username = respuesta.data.username;
            password = respuesta.data.password;
            isAdmin = respuesta.data.isAdmin;
            transformarSidebar();
            moduleExperiencia.extraerExperiencias(isAdmin, username);
        }
        // Si no devuelve nada el axios quiere decir que no hay sesion y se muestra la homePage
        else{
            logeado = false;
            setFormsFeatures();
            muestraTituloExperiencias();
            setListenerLogin();
            setListenerRegistro();
        }
    })
    .catch(function (error) {
        Swal.fire({
            title: "¡VAYA!",
            html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)",
            icon: "error",
        });
    })
    .then(function () {
        // always executed
    });


    // Funcion con toda la logica para que el sidebar funcione correctamente.
    // Se llama a esta funcion independientemente de la vista actual porque el contenido del sidebar lo cambia la funcion transformarSidebar()
    function setSidebar(){
        // Funcion para gestionar el comportamiento y la vista del sidebar
        $('.borderAssets').css("display","block");

        $('.borderAssets').removeClass('fade-out');
        $('.borderAssets').addClass('fade-in');

        $("#dropDownLogin").click();
        $('#sidebarCollapse').on('click', function () {
            
            if ($('#sidebar').hasClass("active")) {
                if(logeado == false){
                    document.getElementById("email").focus();
                }
                // add fade-out para el texto de border antes del login
                $('.borderAssets').removeClass('fade-in');
                $('.borderAssets').addClass('fade-out');

                // "animacion" para quitar el border cada vez que se esconde el sidebar
                setTimeout(function () {$('#sidebar').css("border-right", "90px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "80px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "70px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "60px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "50px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "40px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "30px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "20px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "10px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "0px solid #04aef0");}, 100);

                // setTimeout para ocultar el texto para que el cursor no lo detecte y se pueda hacer click en los inputs
                // 400 de tiempo porque tarda 0.3s en hacer el efecto de fade-out, sino se iría de golpe antes de que termine la animacion
                setTimeout(function () {
                    $('.borderText').css("display", "none");
                }, 400);
            } else {
                // add fade-in para el texto de border antes del login
                $('.borderAssets').removeClass('fade-out');
                $('.borderAssets').addClass('fade-in');
                setTimeout(function () {
                    $('.borderText').css("display", "initial");
                }, 100);

                // se restablece el border del sidebar cuando se esconde
                $('#sidebar').css("border-right", "100px solid #04aef0");
            }
            $('#sidebar').toggleClass('active');
        });
    }

    // Este metodo implementa las funcionalidades de los forms login/registro tales como:
    //    - Desplegables, reseteo de campos al cambiar de form, mostrar password, enviar con tecla ENTER...
    function setFormsFeatures(){
        // Esta funcion resetea los campos de los formularios además de esconderlos en caso de hacer click en uno u otro
        document.querySelectorAll(".dropdown-toggle").forEach(dropDownItem => {
            dropDownItem.addEventListener("click", function () {
                $("#dropDownRegistro").click();
                $("#dropDownLogin").click();

                if ($("#dropDownLogin").attr('aria-expanded') == 'true') {
                    reset("#formRegistro");
                    document.getElementById("email").focus();
                } else {
                    reset("#formLogin");
                    document.getElementById("nom").focus();
                }
            })

            function reset(id) {
                let form = document.querySelector(id);
                form.querySelectorAll("input.form-control").forEach(input => {
                    input.value = ``;
                })
                form.querySelector(".checkboxPass").checked = false;
            }
        });

        // Aqui se añade la funcionalidad de enviar los formularios presionando ENTER en cada uno de los campos existentes
        let formLogin = document.querySelector("#formLogin");
        submitOnEnter(formLogin, "login");

        let formRegistro = document.querySelector("#formRegistro");
        submitOnEnter(formRegistro, "register");

        function submitOnEnter(form, btnId) {
            form.querySelectorAll("input.form-control").forEach(input => {
                input.addEventListener("keyup", function (event) {
                    if (event.key === "Enter") {
                        document.getElementById(btnId).click();
                    }
                })
            })
        }

        // Muestra las contraseñas de los formularios y marca los checkbox
        document.querySelectorAll(".checkEyePass").forEach(spanCheckBox => {
            spanCheckBox.addEventListener("click", function () {
                document.querySelectorAll(".passwd").forEach(inputPass => {
                    if (inputPass.type === "password") {
                        document.querySelectorAll(".checkboxPass").forEach(checkbox => {
                            checkbox.checked = true
                        });
                        inputPass.type = "text";
                    } else {
                        document.querySelectorAll(".checkboxPass").forEach(checkbox => {
                            checkbox.checked = false
                        });
                        inputPass.type = "password";
                    }
                })
            })
        })
    }

    
    // Esta funcion pertenece a la vista de la HomePage. Muestra las ultimas experiencas.
    function muestraTituloExperiencias(){
        axios.get("./database/experiencias/extraerExperiencias.php", {
            params: {
                categoria: "Todas"
            }
            }).then(function (respuesta) {
                let baseDades = JSON.parse(respuesta.data);
                
                let htmlLastExperiences = `<div id="ultimesExperiencies" class="titolExperiencia"><h2>Ultimes Experiencies</h2>`;
                
                let top = 0;
                for (let i = parseInt(baseDades.length) - 1; top < 4; i--) {

                    let element = baseDades[i]["titol"];
                    htmlLastExperiences += `<div id="experiencia${i}" class="pExperiences">`;
                    htmlLastExperiences += `<p>${element}</p>`;
                    htmlLastExperiences += '</div>';
                    top++;
                }

                htmlLastExperiences += '</div>';
                document.getElementById('enunciat').innerHTML="Experiencias";
                document.getElementById('enunciat').insertAdjacentHTML('afterEnd', htmlLastExperiences);

            })
            .catch(function (error) {
            })
            .then(function () {
                // always executed
        });
    }

    ///////////////////////////////////////
    //              LOGIN                //
    ///////////////////////////////////////
    function setListenerLogin(){
        document.getElementById("login").addEventListener("click", function () {
            if (document.getElementById("email").value === "" || document.getElementById("passLogin").value === "") {
                Swal.fire({
                    title: "¡ERROR!",
                    text: "Has dejado campos vacíos...",
                    icon: "error",
                });
            } else {
                axios.get('./database/usuari/login.php', {
                        params: {
                            email: document.getElementById("email").value,
                            pass: document.getElementById("passLogin").value
                        }
                    })
                    .then(function (respuesta) {
                        if (respuesta.data.status == "FAIL") {
                            Swal.fire({
                                title: "¿Tienes cuenta?",
                                text: "El usuario y/o contraseña no coinciden",
                                icon: "error",
                            });
                        } else {
                            if (respuesta.data.email == null) {
                                Swal.fire({
                                    title: "¡VAYA!",
                                    html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)",
                                    icon: "error",
                                });
                            } else {
                                logeado = true;
                                nom = respuesta.data.nom;
                                cognom = respuesta.data.cognom;
                                password = respuesta.data.password;
                                username = respuesta.data.email;
                                if (respuesta.data.isAdmin == 1) {
                                    isAdmin = true;
                                }
                                $('#sidebar').toggleClass('active');
                                transformarSidebar();
                                moduleExperiencia.extraerExperiencias(isAdmin, username);
                            }
                        }
                    })
                    .catch(function (error) {
                        Swal.fire({
                            title: "¡VAYA!",
                            html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)<br><br>Mensaje:<br>" + error,
                            icon: "error",
                        });
                    })
                    .then(function () {
                        // always executed
                    });
            }
        })
    }

    ///////////////////////////////////////
    //             REGISTRO              //
    ///////////////////////////////////////
    function setListenerRegistro(){
        document.getElementById("register").addEventListener("click", function () {
            if (document.getElementById("nom").value === "" || document.getElementById("cognom").value === "" ||
                document.getElementById("username").value === "" || document.getElementById("passRegister").value === "") {
                Swal.fire({
                    title: "¡ERROR!",
                    text: "Has dejado campos vacíos...",
                    icon: "error",
                });
            } else {
                axios.get('./database/usuari/register.php', {
                        params: {
                            nom: document.getElementById("nom").value,
                            cognom: document.getElementById("cognom").value,
                            username: document.getElementById("username").value,
                            pass: document.getElementById("passRegister").value
                        }
                    })
                    .then(function (respuesta2) {
                        if (respuesta2.data.status == "FAIL") {
                            Swal.fire({
                                title: "Ups..",
                                html: `Ya existe un usuario con este mismo correo
                                    <br>[${respuesta2.data.email}]<br>
                                    Inténtelo de nuevo con otro distinto`,
                                icon: "error",
                            });
                        } else {
                            logeado = true;
                            nom = respuesta2.data.nom;
                            cognom = respuesta2.data.cognom;
                            password = respuesta2.data.password;
                            username = respuesta2.data.email;
                            $('#sidebar').toggleClass('active');
                            transformarSidebar();
                            moduleExperiencia.extraerExperiencias(isAdmin, username);
                        }
                    })
                    .catch(function (error) {
                        Swal.fire({
                            title: "¡VAYA!",
                            html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)<br><br>Mensaje:<br>" + error,
                            icon: "error",
                        });
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
            }

        })
    }

    // Funcion para cambiar el contenido del sidebar una vez el usuario se hay logeado
    function transformarSidebar() {

        $('#sidebar').css("border-right", "100px solid #04aef0");

        // Obtenemos el div que contiene los formularios para sobreescribirlo
        let sidebar = document.getElementById("formsIndex");
        sidebar.innerHTML = "";
        sidebar.style.borderTop = "70px solid #30323b";
        sidebar.style.borderTopRightRadius = "75px";

        $('.borderAssets').removeClass('fade-out');
        $('.borderAssets').addClass('fade-in');

        $('.borderText').css("top", "200px");
        $('.borderText').css("height", "fit-content");
        $('.borderText').css("display", "initial");

        // Cambia el boton para abrir sidebar
        document.getElementById("sidebarCollapse").innerHTML = `Opciones`;
        // Cambia el texto del borde del sidebar
        document.getElementById("borderText").innerHTML = `Opciones`;

        // Si el usuario logeado es admin muestra unas opciones de mas
        if (isAdmin == true) {

            let sidebarAdmin =
                `<h4 style="margin-top:-45px;margin-bottom:30px;margin-left:15px;">Rol admin: ${username}</h4>`;
            sidebar.insertAdjacentHTML("beforeend", sidebarAdmin);

            addButtonCategorias();
            addButtonExperiencias();
            addButtonUsuarios();
        }
        else{
            let sidebarNormalUser =
                `<h4 style="margin-top:-45px;margin-bottom:30px;margin-left:15px;">Rol user: ${username}</h4>`;
            sidebar.insertAdjacentHTML("beforeend", sidebarNormalUser);
            
        }

        addButtonNuevaExperiencia();
        addButtonModificarUsuario();
        addButtonLogout();
    }


    /*
        OPCIONES  DE ADMIN - Categorias, Experiencias, Usuario
    */

    function addButtonCategorias(){
        let categoriaAdmin = `<br><button id="categoriaAdmin" class="btn btn-light botones">Categorias</button>`;
        sidebar.insertAdjacentHTML("beforeend", categoriaAdmin);
        document.getElementById("categoriaAdmin").addEventListener('click', function(){
            axios.get("./database/categoria/categoria.php",{
            })
            .then(function (respuesta){
                let categorias = JSON.parse(respuesta.data);
                let htmlmodal = `<div id="modalCategoria" class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Categorias</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <input type="text" id="nuevaCategoria"></input><button id="crearCategory" data-dismiss="modal" class="btn btn-primary botones">Crear</button><br>`;

                    categorias.forEach(categoria => {
                        htmlmodal += `<label>${categoria.nom}</label><br>`;
                    })
                    htmlmodal += `
                    </div>
                    </div>
                </div>
                </div>`;
                document.getElementById("modalAdminCat").innerHTML = htmlmodal;
                $("#modalCategoria").modal();
            })
            .catch(function (error) {
            })
            .then(function () {
                document.getElementById("crearCategory").addEventListener('click', function (){
                    nuevaCategoria = document.getElementById("nuevaCategoria").value;
                    axios.get("./database/categoria/crearCategoria.php",{
                        params: {
                            nom: nuevaCategoria
                        }
                    })
                });
            })
        })
    }
    

    function addButtonExperiencias(){
        let experienciasAdmin =
        `<br><br><button id="expAdmin" class="btn btn-light botones">Experiencias</button>`;
        sidebar.insertAdjacentHTML("beforeend", experienciasAdmin);
        document.getElementById("expAdmin").addEventListener('click', function(){
            axios.get("./database/experiencias/mostrarExperiencias.php",{
            })
            .then(function(respuesta){
                let experiencias = JSON.parse(respuesta.data);
                let htmlmodal = `<table>`;
                        for(i=0;i<experiencias.length;i++){
                            htmlmodal += `<tr>
                            <td id="${experiencias[i].idExp}">${experiencias[i].titol}</td>
                            <td><button class="botonesbar btnRebutjarExp btn btn-primary" nombre="${experiencias[i].idExp}">Rechazar</td>
                            <td><button class="botonesbar btnPublicarExp btn btn-primary" nombre="${experiencias[i].idExp}">Publicar</td>
                            </tr>`;
                        }
                        htmlmodal += `</table>`;
                    document.getElementById("esbozos").innerHTML = htmlmodal;
                    
                    axios.get("./database/experiencias/mostrarReportadas.php",{
                    })
                        .then(function(respuesta){
                            let expreportadas = JSON.parse(respuesta.data);
                            let reportadashtml = `<table>`;
                            for(i=0;i<expreportadas.length;i++){
                                reportadashtml += `<tr>
                                <td id="${expreportadas[i].idExp}">${expreportadas[i].titol}</td>
                                <td><button class="btnQuitarReporte btn btn-primary botones" nombre="${expreportadas[i].idExp}">Quitar Reporte</td>
                                <td><button class="btnRebutjarExp btn btn-primary botones" nombre="${expreportadas[i].idExp}">Eliminar Experiencia</td>
                                </tr>`;
                            }
                            reportadashtml += `</table>`;
                            document.getElementById("reportadas").innerHTML = reportadashtml;
                        })
                        .catch(function(){
                        })
                        .then(function(){
                            botonesAdminPanel();
                        })
                    $("#modalExp").modal();
            })
            .catch(function (){
            })
            .then(function (){
                botonesAdminPanel();
            });
        })
    }

    function botonesAdminPanel(){
        botonesEliminar = document.getElementsByClassName("btnRebutjarExp");
        for(i=0;i<botonesEliminar.length;i++){
            botonesEliminar[i].addEventListener('click', function(e){
                let seleccionado = e.target.getAttribute("nombre");
                axios.get("./database/experiencias/eliminarExperiencia.php",{
                    params: {
                            idCard: seleccionado
                    }
                })
                .then(function(){
                    e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                })
            })
        }
        botonesPublicar = document.getElementsByClassName("btnPublicarExp");
        for(i=0;i<botonesPublicar.length;i++){
            botonesPublicar[i].addEventListener('click', function(e){
                let seleccionado = e.target.getAttribute("nombre");
                axios.get("./database/experiencias/updateEstado.php",{
                    params: {
                            idExp: seleccionado
                    }
                })
                .then(function(){
                    e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                    moduleExperiencia.extraerExperiencias(isAdmin, username);
                })
                .catch(function(){
                })
            })
        }
        botonesReporte = document.getElementsByClassName("btnQuitarReporte");
        for(i=0;i<botonesReporte.length;i++){
            botonesReporte[i].addEventListener('click', function (e) {
                let seleccionado = e.target.getAttribute("nombre");
                console.log(seleccionado);
                axios.get("./database/experiencias/updateReporte.php",{
                    params: {
                        idCard: seleccionado
                    }
                })
                .then(function(){
                    e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                })
            })
        }
    }

    function addButtonUsuarios(){
        let usuarisAdmin =
        `<br><br><button id="usersAdmin" class="btn btn-light botones">Usuarios</button><br>`;
        sidebar.insertAdjacentHTML("beforeend", usuarisAdmin);
        document.getElementById("usersAdmin").addEventListener('click', function(){
            axios.get("./database/usuari/mostrarUsuarios.php",{
            })
            .then(function (respuesta){
                let usuarios = respuesta.data;
                let htmlmodal = `<div id="modalUser" class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Usuarios</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table>`;
                    for(i=0; i<usuarios.length; i++){
                        htmlmodal += `<tr>
                        <td id="${usuarios[i].username}">${usuarios[i].username}</td>
                        <td><button class="btnEliminarUser btn btn-primary botonesUsuarios" nombre="${usuarios[i].username}">Darse de baja</button></td>
                        </tr>`;
                    }
                    htmlmodal += `</table>
                    </div>
                    </div>
                </div>
                </div>`;
                document.getElementById("modalAdminUser").innerHTML = htmlmodal;
                $("#modalUser").modal();
            })
            .catch(function () {
            })
            .then(function () {
                botonesEliminar = document.getElementsByClassName("btnEliminarUser");
                for(i=0;i<botonesEliminar.length;i++){
                    botonesEliminar[i].addEventListener('click', function(e){
                        let seleccionado = e.target.getAttribute("nombre");
                        axios.get("./database/usuari/eliminarUsuario.php",{
                            params: {
                                    username: seleccionado
                            }
                        })
                        .then(function(){
                            e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                        })
                    })
                }
            });
        })
    }


    /*
        OPCIONES EN COMUN - Nueva experiencia, Modificar Usuario, Logout
    */
    // Nova Experiencia
    function addButtonNuevaExperiencia(){
        document.getElementById("formsIndex").insertAdjacentHTML("beforeend",`<br><button id="newExp" class="btn btn-light botones">New Experiencia</button>`);
        document.getElementById("newExp").addEventListener('click', function (e) {
            moduleNewExperiencia.crearExperiencia(username, isAdmin);
        });
    }

    // Modificar Datos del Usuario
    function addButtonModificarUsuario(){     
    
        let buttonModificarUsu = `<br><button id="buttonModificarUsu" class="btn btn-light botones">Modificar Usuario</button>`;
        sidebar.insertAdjacentHTML("beforeend", buttonModificarUsu);
        document.getElementById("buttonModificarUsu").addEventListener('click', function(){
            let htmlmodal = `<div id="modalCategoria" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Opciones de Usuario</h5>
                </div>
                <div class="modal-body">
                <div>
                        <label for="">Nombre: </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" name="" id="nombre">
                        <br>
                        <label for="">Apellido: </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" name="" id="apellido">
                        <br>
                        <label for="">Contraseña: </label>
                        &nbsp;
                        <input type="text" name="" id="contraseña">
                        <br><br>
                        <button id="modificarUsu" class="btn btn-primary">Modificar Usuario</button>
                </div>
                </div>
            </div>
            </div>`;
            document.getElementById("modalAdminCat").innerHTML = htmlmodal;
            $("#modalCategoria").modal();

            document.getElementById("nombre").value = nom;
            document.getElementById("apellido").value = cognom;
            document.getElementById("contraseña").value = password;

            document.getElementById("modificarUsu").addEventListener("click", function () {
                axios.get("./database/usuari/updateInfoUsuario.php", {
                        params: {
                            username: username,
                            nombre: document.getElementById("nombre").value,
                            apellido: document.getElementById("apellido").value,
                            password: document.getElementById("contraseña").value
                        }
                    })
                    .then(function (respuesta) {
                        if (respuesta.data.status == "FAIL") {
                            alert("ERROR, TE HAS EQUIVODADO");
                        } else {
                            Swal.fire({
                                title: "Tus datos han sido modificados:",
                                html: "<b>Nombre: </b>"+document.getElementById("nombre").value+"<br><b>Apellido: </b>"+document.getElementById("apellido").value+"<br><b>Contraseña: </b>"+ document.getElementById("contraseña").value,
                                icon: "success",
                            });

                            nom = document.getElementById("nombre").value;
                            cognom = document.getElementById("apellido").value;
                            password = document.getElementById("contraseña").value;

                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
            });
        })
    }

    //LOGOUT
    function addButtonLogout(){
        document.getElementById("formsIndex").insertAdjacentHTML("beforeend",`<br><br><button id="logout" class="btn btn-light botones">LOGOUT</button>`);
        document.getElementById("logout").addEventListener('click',function(e){
            axios.get('./database/usuari/logout.php')
            .then(function (respuesta) {
                if(respuesta.data == "OK"){
                    window.location.reload();
                }
            })
            .catch(function (error) {
                Swal.fire({
                    title: "¡VAYA!",
                    html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)",
                    icon: "error",
                });
            })
            .then(function () {
                // always executed
            });
        })
    }
}

