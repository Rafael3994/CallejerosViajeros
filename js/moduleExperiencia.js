var moduleExperiencia = (function () {

    // Esta es la funcion "madre" de todas las demas.
    // Todas las funciones empiezan y terminan aqui.
    // Esta funcion se encarga de obtener todas las experiencias de la BD y pasarlas a printExperiencies()
    // printExperiencies() es la encargada de printarlas y añadir todos los listeners correspondientes
    // ademas de crear el modal para la experiencia que el user haya seleccionado
    function extraerExperiencias(isAdmin, username, categoria) {
        if (categoria == null) {
            categoria = "Todas";
        }
        axios.get("./database/experiencias/extraerExperiencias.php", {
            params: {
                categoria: categoria
            }
            }).then(function (respuesta) {
                let baseDades = JSON.parse(respuesta.data);
                let desplegableBuscador = "null";
                // Este axios es obligatorio para obtener las categorias y mostrarlas en el desplegable
                extraerCategorias().then(function (response) {
                    let categorias = JSON.parse(response.data);
                    desplegableBuscador = `
                    <div id="desplegableBuscador" class="desplegableBuscador">
                        <h2 id="titolExperiencies">Experiencias</h2>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" style="width:200px;" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                ${categoria}
                            </button>
                            <div class="dropdown-menu" style="width:200px;" aria-labelledby="dropdownMenuButton">
                                <button id="Todas" class="dropdown-item btn-dropdown-categoria">Todas</button>`;
                            categorias.forEach(categoria => {
                                desplegableBuscador += `<button id="${categoria.nom}" class="dropdown-item btn-dropdown-categoria">${categoria.nom}</button>`;
                            })
                            desplegableBuscador += `
                            </div>
                        </div>
                    </div>
                    <div class="content-row">
                        <div id="contenedorExperiencias" class="row">`;
                    document.getElementById("content").innerHTML = desplegableBuscador;
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    printExperiencies(baseDades, isAdmin, username, categoria);
                    axios.get("./database/experiencias/extraerExperiencias.php", {
                        params: {
                            setNavegador: "true",
                            setNavegadorCategoria: categoria
                        }
                    })
                    .then(function(respuesta) {
                        document.getElementById("contenedorExperiencias").insertAdjacentHTML("afterend",respuesta.data);
                        cambiarDePagina(isAdmin, username, categoria);
                    });
                    
                });

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    function extraerCategorias(){
        return axios.get("./database/categoria/categoria.php");
    }

    function printExperiencies(baseDades, isAdmin, username, categoria) {

        let htmlExperiences = "";
        let numExperiencias = 0;
        let card;

        // IF: Entra cuando se muestran todas las experiencias
        if (categoria == null || categoria == "Todas") {
            card = setCard(baseDades, null);
            if (card != "" || card != null) {
                htmlExperiences += card;
                numExperiencias++;
            }
            // ELSE: Entra cuando se filtra por categorias
            // forEach para imprimir las cards de una en una segun si forma parte de la categoria o no
        } else {
            let cards = [];
            baseDades.forEach(element => {
                if (element.estat == 'publicada') {
                    if (element.nomCategoria == categoria) {
                        card = setCard(baseDades, element);
                        if (card != "" || card != null) {
                            cards.push(card);
                            existeExperiencia = true;
                            numExperiencias++;
                        }
                    }
                }
            });
            // setEstructuraCards es una funcion utilizada para crear un vista adecuada para cada categoria
            if (numExperiencias > 0) {
                htmlExperiences += setEstructuraCards(numExperiencias, cards, card);
            } else {
                htmlExperiences += "NO EXISTEN EXPERIENCIAS";
            }
        }
        htmlExperiences +=
                            `<!-- final contenedor experiencias -->
                            </div>
                        <div>`;
        
        document.getElementById("contenedorExperiencias").innerHTML = htmlExperiences;

        listenerDropdownCategorias(isAdmin, username, categoria);

        
        /////////////////////////////////////////////////////////////////
        //   AÑADE LISTENERS A LAS CARDS Y CREA SU RESPECTIVO MODAL    //
        /////////////////////////////////////////////////////////////////
        document.querySelectorAll(".card").forEach(card => {
            card.addEventListener("click", function (e) {
                // Crear modal dinamicamente
                let idCard = card.getAttribute("id");
                let infoSelectedExp;
                let mapa;
                let existe = false;
                idExperienciaSeleccionada = idCard;

                baseDades.forEach(experiencia => {
                    if (experiencia.idExp == idCard) {
                        existe = true;
                        infoSelectedExp = experiencia;
                        mapa = `<iframe src="http://maps.google.com/maps?q=${infoSelectedExp.coordenades}&t=k&z=7&output=embed&v=satellite" width="400px" height="400px" frameborder="0" style="border:0"></iframe>`
                        return;
                    }

                });

                if (existe === true) {

                    // Funcion para que aparezca el popover de google maps (todo boostrap)
                    // Mediante jQuery se consigue que aparezca el popover haciendo hover sobre el boton y se mantenga abierto en caso de explorar por el mapa
                    // El comportamiento del hover se añade tanto al boton como al mapa
                    // El set timeout es necesario para que el mapa se mantenga abierto al quitar el hover del boton
                    $(function () {
                        $('[data-toggle="popover"]').popover({
                                html: true,
                                trigger: "manual"
                            })
                            .on("mouseenter", function () {
                                let _this = this;
                                $(this).popover("show");
                                $(".popover").on("mouseleave", function () {
                                    $(_this).popover('hide');
                                });
                            })
                            .on("mouseleave", function () {
                                let _this = this;
                                setTimeout(function () {
                                    if (!$(".popover:hover").length) {
                                        $(_this).popover("hide");
                                    }
                                }, 200);
                            });
                    })

                    let modal =
                        `<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div id="modal-content" class="modal-content">
                                <div class="modal-header" style="display:block">
                                    <h4 class="modal-title" id="titulo${idCard}">${infoSelectedExp.titol}</h4>
                                    <div style="display:flex;justify-content:space-between;">
                                        <p id="fecha${idCard}" style="color:grey">${infoSelectedExp.data}</p>
                                        <p id="nomCategoria${idCard}" style="color:grey;">${infoSelectedExp.nomCategoria}</p>
                                    </div>
                                    <img id="img${idCard}" src="./img/experiencias/uploads/${infoSelectedExp.imatge}" class="modal-img" alt="${infoSelectedExp.imatge}">
                                    <div class="box_likes-dislikes">
                                        <button id="dislike${idCard}" class="btn"><li class="fa fa-thumbs-down" style="color:red"></li><span style="margin-left:5px;">${infoSelectedExp.dislikes}</span></button>
                                        <button id="like${idCard}" class="btn"><li class="fa fa-thumbs-up" style="color:green"></li><span style="margin-left:5px;">${infoSelectedExp.likes}</span></button>
                                    </div>
                                </div>
                                <div id="modal-body" class="modal-body">
                                    <p id="texto${idCard}">${infoSelectedExp.text}</p>                                   
                                </div>
                                <div id="modal-footer" class="modal-footer">
                                    <button id="reportar${idCard}" class="btn btn-warning reportar">Reportar</button>`
                    if (isAdmin == true || (username == infoSelectedExp.username)) {
                        modal += `<button id="eliminar${idCard}" class="btn btn-danger eliminar">Eliminar</button>
                                      <button id="editar${idCard}" class="btn btn-primary editar">Editar</button>`;
                    }
                    modal += `<div class="btn-popover" style="display:block">
                                        <a tabindex="0" class="btn" role="button" data-toggle="popover" title="Google Maps" data-container=".btn-popover" data-content='${mapa}'>Google Maps
                                            <i class="fas fa-map-marker-alt"></i>
                                        </a>
                                    </div>
                                </div>
                                <div id="uploadImg" style="display:block">
                            </div>
                            </div>
                        </div>
                    </div>`


                    aux_modal = modal;
                    document.getElementById("divModal").innerHTML = modal;
                    $('#modal').modal();


                    /////////////////////////////////////////////////////////////////
                    //             LISTENERS (like/dislike/editar...)              //
                    /////////////////////////////////////////////////////////////////

                    // LIKE
                    document.getElementById(`like${idCard}`).addEventListener("click", function (e) {
                        let likes = parseInt(infoSelectedExp.likes) + 1;
                        let dislikes = parseInt(infoSelectedExp.dislikes);

                        updateLikes(idCard, likes, dislikes, isAdmin, username, categoria);
                        updateModalView(idCard);
                    });

                    // DISLIKE
                    document.getElementById(`dislike${idCard}`).addEventListener("click", function (e) {
                        let likes = parseInt(infoSelectedExp.likes);
                        let dislikes = parseInt(infoSelectedExp.dislikes) + 1;

                        updateLikes(idCard, likes, dislikes, isAdmin, username, categoria);
                        updateModalView(idCard);
                    });


                    // EDITAR
                    // Marca como editables el titulo, la fecha y el texto
                    // Habilita la posibilidad de escribir en negrita e italica
                    // Guarda todos los cambios y muestra la experiencia actualizada
                    document.getElementById(`editar${idCard}`).addEventListener("click", function (e) {
                        document.getElementById(`editar${idCard}`).disabled = true;

                        document.getElementById(`titulo${idCard}`).contentEditable = true;
                        document.getElementById(`fecha${idCard}`).contentEditable = true;

                        let textoExperiencia = document.getElementById(`texto${idCard}`);
                        textoExperiencia.contentEditable = true;
                        textoExperiencia.focus();

                        let btnsModificarTexto = `<div style="display:flex;margin-left:auto;margin-right:auto;margin-top:5px;">
                            <button id="bold" class="btn formatTextBtn" style="margin-right:100px;"><i class="fas fa-bold"></i></button>
                            <button id="italic" class="btn formatTextBtn"><i class="fas fa-italic"></i></button>
                            <button id="save" class="btn saveTextBtn"><i class="fas fa-save"></i></button>
                        </div>`

                        document.getElementById("modal-body").insertAdjacentHTML("beforebegin", btnsModificarTexto);

                        let uploadImg = `<input id="sortpicture" type="file" accept="image/png, image/jpg" name="sortpic"/>
                        <button id="upload">Upload</button>`;
                        document.getElementById("uploadImg").innerHTML = uploadImg;
                        addListenerUploadPhoto();


                        document.getElementById("bold").addEventListener("click", function (e) {
                            document.getElementById("bold").classList.toggle("formatTextBtn-focus");
                            document.execCommand('bold');
                            textoExperiencia.focus();
                        });
                        document.getElementById("italic").addEventListener("click", function (e) {
                            document.getElementById("italic").classList.toggle("formatTextBtn-focus");
                            document.execCommand('italic');
                            textoExperiencia.focus();
                        });
                        document.getElementById("save").addEventListener("click", function (e) {
                            let newTitulo = document.getElementById(`titulo${idCard}`).textContent;
                            let newFecha = document.getElementById(`fecha${idCard}`).textContent;
                            let newTexto = document.getElementById(`texto${idCard}`).innerHTML;
                            let newSrc = document.getElementById(`img${idCard}`).src;
                            // Obtener solo el nombre de la imagen, no todo el src (el nombre se encuentra despues del ultimo "/")
                            let n = newSrc.lastIndexOf('/');
                            let newImg = newSrc.substring(n + 1);

                            updateExperiencia(idCard, newTitulo, newFecha, newTexto, newImg, isAdmin, username, categoria);
                            updateModalView(idCard);
                        });
                    });


                    function addListenerUploadPhoto(){
                        document.getElementById(`upload`).addEventListener("click", function (e) {
                            var file_data = $('#sortpicture').prop('files')[0];   
                            var form_data = new FormData();                  
                            form_data.append('file', file_data);
                            $.ajax({
                                url: './upload.php', 
                                dataType: 'text',
                                cache: false,
                                contentType: false,
                                processData: false,
                                data: form_data,                         
                                type: 'post',
                                success: function(php_script_response){
                                    console.log(php_script_response)
                                    document.getElementById(`img${idCard}`).src = `./img/experiencias/uploads/${php_script_response}`;
                                }
                            });
                        
                        });
                    }
                    
                    // ELIMINAR
                    document.getElementById(`eliminar${idCard}`).addEventListener("click", function (e) {
                        let modalConfirmDialog = `
                        <div id="modalConfirm" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-sm">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title" style="margin-left:auto;margin-right:auto;" id="myModalLabel">¿Eliminar?</h4>
                                    </div>
                                    <div class="modal-body">
                                        <p>Esta accion no se puede revertir.<br>¿Seguro que desea eliminar la exepriencia?</p>
                                        <div style="margin-left:25%;">
                                            <button type="button" class="btn btn-secondary" id="modal-btn-si" style="margin-right:20%;">Si</button>
                                            <button type="button" class="btn btn-danger" id="modal-btn-no">No</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

                        document.getElementById("divModalConfirm").innerHTML = modalConfirmDialog;
                        $("#modalConfirm").modal();

                        let modalConfirm = function (callback) {
                            $("#modal-btn-si").on("click", function () {
                                callback(true);
                                $("#modalConfirm").modal('hide');
                            });
                            $("#modal-btn-no").on("click", function () {
                                callback(false);
                                $("#modalConfirm").modal('hide');
                            });
                        };

                        modalConfirm(function (confirm) {
                            if (confirm) {
                                eliminarExperiencia(idCard, isAdmin, username, categoria);
                                // Escondemos el modal de la experiencia que hemos eliminado
                                $('#modal').modal('hide');
                            }
                        });
                    });

                    // REPORTAR
                    document.getElementById(`reportar${idCard}`).addEventListener("click", function (e) {
                        reportarExperiencia(idCard, isAdmin, username, categoria);
                    })
                } else {
                    Swal.fire({
                        title: "¡VAYA!",
                        html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)<br><br>Código de error:<br>infoSelectedExp is: " + infoSelectedExp,
                        icon: "error",
                    });
                }
            })
        });
    }

    //////////////////////////////////////////////////////////////////////////////////
    //                  AXIOS DE LIKES Y DISLIKES UNA EXPERIENCIA                   //
    //////////////////////////////////////////////////////////////////////////////////
    /*
    Params:
        - idUsu: id del usuario que ha dado like/dislike
        - likes, dislikes: cantidad de likes/dislikes que tiene actualmente la experiencia
        - isAdmin/username: Necesarias para volver actualizar la vista segun el usuario y si es admin o no.
        - categoria: Necesaria para seguir mostrando la vista de la categoria que estaba seleccionada (si es null muestra todas)
    */
    function updateLikes(idUsu, likes, dislikes, isAdmin, username, categoria) {
        axios.get("./database/experiencias/updateLikes.php", {
                params: {
                    idUsu: idUsu,
                    likes: likes,
                    dislikes: dislikes
                }
            })
            .then(function (respuesta) {
                if (respuesta.data == "FAIL") {
                    alert("ERROR, TE HAS EQUIVODADO");
                } else {
                    extraerExperiencias(isAdmin, username, categoria);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    //////////////////////////////////////////////////////////////////////////////////
    //                   AXIOS QUE ACTUALIZA UNA EXPERIENCIA                        //
    //////////////////////////////////////////////////////////////////////////////////
    /*
    Params:
        - idCard: id de la card a la que el user ha clicado (util para poder crear su modal)
        - new*: Todos los valores del modal. Sustituiran los valores previos en la BD
        - isAdmin/username: Necesarias para volver actualizar la vista segun el usuario y si es admin o no.
        - categoria: Necesaria para seguir mostrando la vista de la categoria que estaba seleccionada (si es null muestra todas)
    */
    function updateExperiencia(idCard, newTitulo, newFecha, newTexto, newImg, isAdmin, username, categoria) {

        axios.get("./database/experiencias/updateExperiencia.php", {
                params: {
                    idCard: idCard,
                    newTitulo: newTitulo,
                    newFecha: newFecha,
                    newTexto: newTexto,
                    newImg: newImg
                }
            })
            .then(function (respuesta) {
                console.log("RESPUESTA UPDATE: " + respuesta.data);
                if (respuesta.data == "FAIL") {
                    alert("ERROR, TE HAS EQUIVODADO");
                } else {
                    extraerExperiencias(isAdmin, username, categoria);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    //////////////////////////////////////////////////////////////////////////////////
    //                   AXIOS QUE ELIMINA UNA EXPERIENCIA                          //
    //////////////////////////////////////////////////////////////////////////////////
    /*
    Params:
        - idCard: id de la card que el user quiere eliminar
        - isAdmin/username: Necesarias para volver actualizar la vista segun el usuario y si es admin o no.
        - categoria: Necesaria para seguir mostrando la vista de la categoria que estaba seleccionada (si es null muestra todas)
    */
    function eliminarExperiencia(idCard, isAdmin, username, categoria) {

        axios.get("./database/experiencias/eliminarExperiencia.php", {
                params: {
                    idCard: idCard
                }
            })
            .then(function (respuesta) {
                if (respuesta.data == "FAIL") {
                    alert("ERROR, TE HAS EQUIVODADO");
                } else {
                    extraerExperiencias(isAdmin, username, categoria);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    //////////////////////////////////////////////////////////////////////////////////
    //                   AXIOS QUE REPORTARA UNA EXPERIENCIA                        //
    //////////////////////////////////////////////////////////////////////////////////
    /*
    Params:
        - idCard: id de la card que el user quiere eliminar
        - isAdmin/username: Necesarias para volver actualizar la vista segun el usuario y si es admin o no.
        - categoria: Necesaria para seguir mostrando la vista de la categoria que estaba seleccionada (si es null muestra todas)
    */
    function reportarExperiencia(idCard, isAdmin, username, categoria) {

        axios.get("./database/experiencias/reportarExperiencia.php", {
                params: {
                    idCard: idCard
                }
            })
            .then(function (respuesta) {
                if (respuesta.data == "FAIL") {
                    alert("ERROR, TE HAS EQUIVODADO");
                } else {
                    extraerExperiencias(isAdmin, username, categoria);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }


    // Esta funcion lanza un axios para gestionar todo el tema del paginado
    function cambiarDePagina(isAdmin, username, categoria){
        $('.pagination li a').on('click', function(){
            
            $('#contenedorExperiencias').animate({ opacity: 0 });

            let page = $(this).attr('data');

            axios.get("./database/experiencias/extraerExperiencias.php", {
                params: {
                    page: page,
                    pageCategoria: categoria
                }
            })
            .then(function (respuesta) {

                document.getElementById("contenedorExperiencias").innerHTML = "";

                let nextExperiencias = JSON.parse(respuesta.data);
                
                printExperiencies(nextExperiencias, isAdmin, username, categoria);
                
                $('#contenedorExperiencias').animate({ opacity: 1 })

                $('.pagination li').removeClass('active');
                $('.pagination li a[data="'+page+'"]').parent().addClass('active');
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });

        });      
    }

    function anadirExp(novaExp, isAdmin, username, categoria) {
        axios.get("./database/experiencias/anadirExp.php", {
                params: {
                    titol: novaExp["titol"],
                    text: novaExp["text"],
                    imatge: novaExp["imatge"],
                    coordenades: novaExp["coordenades"],
                    idCat: $nuevaExp["idCat"],
                    username: $nuevaExp["username"]
                }
            })
            .then(function (respuesta) {
                if (respuesta.data == "FAIL") {
                    alert("ERROR, TE HAS EQUIVODADO");
                } else {
                    extraerExperiencias(isAdmin, username, categoria);
                }
            })
    }

    // Funcion para construir las cards de cada experiencia
    // IF: El usuario ha filtrado por categoria y se pasan solo las experiencias correspondientes una a una
    // ELSE: forEach para mostrar todas, sin filtros.
    // RETURN: En cualquier caso se devuelve el string con la/s card/s contruida/s
    /*
    Params:
        - baseDades: contiene TODAS las experiencias de la base de datos en formato Array
        - experiencia: array asociativo unicamente con una experiencia, ya filtrada por categoria 
    */
    function setCard(baseDades, experiencia) {
        let card = "";
        // Si experiencia NO es null quiere decir que el user ha filtrado por categoria, se van construyendo una a una
        if (experiencia != null) {
            card +=
                `<div id="${experiencia.idExp}" class="card">
                    <img src="./img/experiencias/uploads/${experiencia.imatge}" class="card-img-top" alt="${experiencia.imatge}">
                    <div class="card-body">
                        <h5 class="card-title">${experiencia.titol}</h5>
                        <p class="card-data">${experiencia.data}</p>
                    </div>
                </div>`
        }
        // Si experiencia ES null quiere decir que el user no quiere filtrar. Se construyen todas aqui mediante forEach
        else {
            baseDades.forEach(element => {
                if (element.estat == 'publicada') {
                    card +=
                        `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 card-experiencia">
                            <div id="${element.idExp}" class="card">
                                <img src="./img/experiencias/uploads/${element.imatge}" class="card-img-top" alt="${element.imatge}">
                                <div class="card-body">
                                    <h5 class="card-title">${element.titol}</h5>
                                    <p class="card-data">${element.data}</p>
                                </div>
                            </div>
                        </div>`;
                }
            });
        }

        return card;
    }

    // Funcion creada para mostrar las experiencias mucho mas vistosas utilizando las clases de boostrap
    // Es llamada cuando se contruye la vista de las experiencias segun su categoria
    // Dependiendo del numero de experiencias se asignan unas clases u otras de boostrap
    /*
    Params:
        - numExperiencias: numero de experiencias que hay en una misma categoria. Util para saber que clases usar.
        - cards: es un array con todas las experiencias de una misma categoria.
        - card: info de una unica experiencia, no se le asignan clases.
            Esto ocurre cuando en la categoria seleccionada no hay mas que una experiencia.
    */
    function setEstructuraCards(numExperiencias, cards, card) {

        let classesBoostrap;
        if (numExperiencias == 1) {
            return `<div class="card-experiencia">` + card + `</div>`;
        } else if (numExperiencias == 2) {
            classesBoostrap = `col-sm-12 col-md-12 col-lg-6`;
            return aux(cards, classesBoostrap);
        } else if (numExperiencias == 3) {
            classesBoostrap = `col-sm-12 col-md-6 col-lg-4`;
            return aux(cards, classesBoostrap);
        } else {
            classesBoostrap = `col-sm-12 col-md-6 col-lg-4 col-xl-3`;
            return aux(cards, classesBoostrap);
        }

        // Esta funcion es para ahorrar codigo unicamente
        function aux() {
            let finalCard = "";
            cards.forEach(cardEx => {
                finalCard += `<div class="${classesBoostrap} card-experiencia">`;
                finalCard += cardEx;
                finalCard += `</div>`;
            });
            return finalCard;
        }
    }


    // Esta funcion se llama justo despues de que un usuario modifique algo de las experiencias (modal)
    // Funcionamiento: impides al usuario hacer clicks para que cierre el modal, insertas el gif de loading, setTimeout para asegurarnos de que se haya modificado
    // la info en la DB y el axios haya obtenido la info actualizada, reseteas los clicks, cierras el modal viejo y simulas click sobre
    // la experiencia previamente abierta para volverla a abrir automaticamente.
    function updateModalView(idCard) {
        $("*").css("pointer-events", "none");
        $("*").css("cursor", "not-allowed");
        document.getElementById("modal-footer").innerHTML = `<img src="./img/loading.gif" alt="Loading..." width="50px" style="margin-left:auto;margin-right:auto"></img>`;

        setTimeout(function () {
            $("*").css("pointer-events", "auto");
            $("*").css("cursor", "default");
            // Eliminamos el "fade" que hace el modal al fondo, lo escondemos, lo eliminamos del DOM y llamamos al modal de nuevo
            $("#modal").removeClass('fade').modal('hide');
            $('#modal').remove();
            document.getElementById(idCard).click();
        }, 2000);
    }


    /////////////////////////////////////////////////////////////////
    //        LISTENERS A CADA CATEGORIA DEL DROPDOWN MENU         //
    /////////////////////////////////////////////////////////////////
    function listenerDropdownCategorias(isAdmin, username, categoria){
        
        document.querySelectorAll(".btn-dropdown-categoria").forEach(dropDownItem => {
            dropDownItem.addEventListener("click", function (e) {
                let categoria = dropDownItem.id;
                $("*").css("pointer-events", "none");
                $("*").css("cursor", "not-allowed");
                document.getElementById("content").innerHTML = `<img src="./img/loading.gif" alt="Loading..." width="50px" style="margin-left:auto;margin-right:auto"></img>`;
                setTimeout(function () {
                    $("*").css("pointer-events", "auto");
                    $("*").css("cursor", "default");
                    extraerExperiencias(isAdmin, username, categoria);
                }, 2000);
            })
        });
    }


    return {
        extraerExperiencias: extraerExperiencias,
        extraerCategorias: extraerCategorias,
        anadirExp: anadirExp
    };

})();