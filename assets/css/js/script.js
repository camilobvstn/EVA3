// importamos las promesas para poder trabjar en la base de datos
import { registrarUsuariosBase,obtenerUsuarios,eliminarUsuario,actualizarUsuarioBase } from "./promesas.js";

// Asignamos los botones con los click y tambien ahcemos que funcionen al termianr de cargar la paginas
window.addEventListener("load", () => {
    //boton para enviar y ala vez verifica los campos
    document.getElementById("btnEnviar").addEventListener("click",verificaryregistarCampos );
   
    // boton para alternar el contraste de colores en la pagina
    document.getElementById("btnContraste").addEventListener("click", cambiarContraste);
    
    // boton par alternar el tamanio de las fuentes en la pagina
    document.getElementById("btnFuente").addEventListener("click", cambiarFuenteTamano);
    
    //cargamos los datos de la base de datos en la pagina, debe ir despues de las demas funciones, de lo contrario no funcionaria.
    cargarDatos()

    //boton que nos permite reemplazar los datos de la base de datos por los que ingresemos
    document.getElementById("btnActualizar").addEventListener("click",actualizarUsuario );
});

// const q sirve para crear un boton que permite que solo se puedan registarr usuarios que passaron la validacion y ademas carga los datos al registrar para mostrarlos en la tabla
const verificaryregistarCampos = () => {
    if (validar()) {
        registrarUsuarios();
        cargarDatos();
    } 
    else {
        alert("complete todos los campos correctamente.");
    }
};



// const q nos sirve para registrar usuarios
const registrarUsuarios = () => {
    // llamamos a los valores de los inputs del formulario
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eEmail = document.getElementById("email");
    let eTelefono = document.getElementById("telefono");
    let eDireccion = document.getElementById("direccion");
    let eUsuario = document.getElementById("usuario");
    let eDescripcion= document.getElementById("descripcion")

    // Creamos una lista q almacene los de los inputs
    let usuarioregistrado = {
        nombre: eNombre.value,
        apellido: eApellido.value,
        email: eEmail.value,
        telefono: eTelefono.value,
        direccion: eDireccion.value,
        usuario: eUsuario.value,
        descripcion: eDescripcion.value
    };

    console.log(usuarioregistrado);

    // una vez que promesa se cumpla o no mostrara la alerta correspondiente
    registrarUsuariosBase(usuarioregistrado).then(() => {
        alert("Se registró con éxito");
        console.log("se registro")
    }).catch((error) => {
        alert("No se pudo registrar");
        console.log(error);
    });
}

//  creamos una funcion para traer todo lo que esta registrado en la base de datos
const cargarDatos = ()=>{
    
    obtenerUsuarios().then((usuario) =>{
        console.log(usuario)
        //creamos tabla donde iran los datos  y tambien los botones para eliminar y actualizar
        let estructura = ""

        //ciclo que al ejecutar la funcion "cargardatos()" crea una estructura de base de datos donde se mostrarn los datos que registremos
        usuario.forEach((p) =>{
            estructura += "<tr>"
            estructura += "<td class=tdd>" +p.nombre+"</td>"
            estructura += "<td class=tdd>" +p.apellido+"</td>"
            estructura += "<td class=tdd>" +p.email+"</td>"
            estructura += "<td class=tdd>" +p.telefono+"</td>"
            estructura += "<td class=tdd>" +p.direccion+"</td>"
            estructura += "<td class=tdd>" +p.usuario+"</td>"
            estructura += "<td class=tdd>"+p.descripcion+"</td>"
            estructura += "<td><button id='UPD"+p.id+"'>actualizar</button></td>"
            estructura += "<td><button id='DEL"+p.id+"'>eliminar</button></td>"
            estructura +="</tr>";
            
        })
        // rellenamos la tabla con los datos
        document.getElementById("cuerpoTabla").innerHTML=estructura;
        usuario.forEach((p)=>{
            let elemento = document.getElementById('UPD'+p.id);
            elemento.addEventListener("click",()=>{
                document.getElementById("nombre").value = p.nombre;
                document.getElementById("apellido").value = p.apellido;
                document.getElementById("email").value = p.email;
                document.getElementById("telefono").value = p.telefono;
                document.getElementById("direccion").value = p.direccion
                document.getElementById("usuario").value = p.usuario 
                document.getElementById("descripcion").value = p.descripcion 
                document.getElementById("btnActualizar").value = p.id
            });
            
            // creamos una funcion que nos permita eliminar una lista(usuario) de la base de datos
            let btnEliminar = document.getElementById("DEL"+p.id);
            btnEliminar.addEventListener("click",()=>{
                if(confirm("Desea eliminar a:\n"+p.nombre+" "+p.apellido)){
                    eliminarUsuario(p.id).then (()=>{
                        alert ("eliminaste con exito")
                        cargarDatos();
                    }).catch((e)=>{
                        console.log(e);
                    })

                }else{
                    console.log("cancelaste la eliminacion")
                }
            })
        })
    })
}

// creamos una funcion que nos permita actualizar un usuario de la base de datos
const actualizarUsuario=()=>{
    // obtenemos los valores y los almacenamos en "e....""
    let eNombre=document.getElementById("nombre")
    let eApellido=document.getElementById("apellido")
    let eEmail=document.getElementById("email")
    let eTelefono=document.getElementById("telefono")
    let eDireccion=document.getElementById("direccion")
    let eUsuario=document.getElementById("usuario")
    let eDescripcion=document.getElementById("descripcion")

    //almacenamos el valor de los inputs en variables que ayudaran en la actualizacion
    let vNombre= eNombre.value
    let vApellido= eApellido.value
    let vEmail= eEmail.value
    let vTelefono= eTelefono.value
    let vDireccion=eDireccion.value
    let vUsuario= eUsuario.value
    let vDescripcion=eDescripcion.value
    
    let UPDusuario={nombre:vNombre,apellido:vApellido,
        email:vEmail,telefono:vTelefono,direccion:vDireccion,usuario:vUsuario,descripcion:vDescripcion}

    // se encarga de actualizar los datos de la tabla por los que enviamos
    let id=document.getElementById("btnActualizar").value    
    actualizarUsuarioBase(UPDusuario,id).then(()=>{
        alert("Se actualizo la usuario con exito.")
        cargarDatos();
        eNombre.value=""
        eApellido.value=""
        eEmail.value=""
        eTelefono.value=""
        eDireccion.value=""
        eUsuario.value=""
        eDescripcion.value=""
        document.getElementById("btnActualizar").disabled=""
    }).catch((e)=>{
        alert("No se pudo actualizar al usuario.")
        console.log(e)
    })
}

// funcion que valida los campos (apoyado por documentacion)
function validar() {
    // creamos una variable con una condicion determinada(true) para que todas partan de igual manera
    let valido = true;
    valido &= validarVacio("nombre");
    valido &= validarVacio("apellido");
    valido &= validarVacio("email");
    valido &= validarLongitud("telefono");
    valido &= validarVacio("direccion");
    valido &= validarVacio("usuario");
    valido &= validarLongitud2("descripcion")

    // una vez aplicadas las funciones de validacion para cada campo retornamos la variable "valido" para saber si alguna validacion fallo.
    return valido;
}

// funcion que identifica los campos que estan vacios
function validarVacio(idCampo) {
    let eForm = document.getElementById("form");
    let elemento = document.getElementById(idCampo);
    let valor = elemento.value.trim();
    let eID = document.getElementById("p" + idCampo);

    // creamos una variable para almacenar el resultado dela validacion
    let EsValido = valor !== "";
    // en relacion de la comparacion con EsValido aplica estilos que ayudan a la identifiacion de los campos mal rellenados y aquellos que no necesitan correcion
    if (!EsValido) {
        elemento.style.border = "1px solid red";
        eID.style.display = "block";
        eID.style.color = "red";
        eForm.style.height="1150px"
    } else {
        elemento.style.border = "1px solid green";
        eID.style.display = "none";
    }

    return EsValido;
}
// funcion creada especificamente para el campo de descripcion, como es opcional nos permite dejarlo con 0 caracteres o de lo contrario si el usuario ingresa una debera ingresa al menos 10 caracteres
function validarLongitud2(idCampo) {
    let elemento = document.getElementById(idCampo);
    let valor = elemento.value.trim();
    let eID = document.getElementById("p" + idCampo);

    // creamos una variable para almacenar el resultado dela validacion
    let esValido = valor.length >10 || valor.length ===0;

    // !esValid nos ayuda a saber si se cumple la validacion, en caso de ser asi aplica los estilos correspondientes !=distinto de
    if (!esValido) {
        elemento.style.border = "1px solid red";
        eID.style.display = "block";
        eID.style.color = "red";
    } else {
        elemento.style.border = "1px solid green";
        eID.style.display = "none";
    }

    return esValido;
}


// Funcion creada especificmente para el campo de telefono, al ser opcional nos permite dejarlo en 0 caracteres o en caso de ingresar alguno debe tner lso correspondientes(9 en caso de numero telefonico en CHile)
function validarLongitud(idCampo) {
    let elemento = document.getElementById(idCampo);
    let valor = elemento.value.trim();
    let eID = document.getElementById("p" + idCampo);

    // creamos una variable para almacenar el resultado dela validacion
    let esValido = valor.length === 9 || valor.length === 0;

     // !esValido nos ayuda a saber si se cumple la validacion, en caso de ser asi aplica los estilos correspondientes !=distinto de
    if (!esValido) {
        elemento.style.border = "1px solid red";
        eID.style.display = "block";
        eID.style.color = "red";
    } else {
        elemento.style.border = "1px solid green";
        eID.style.display = "none";
    }

    return esValido;
}

// funcion para cambiar el contraste de la pagina
function cambiarContraste() {
    let eBody = document.body;
    let fondo = eBody.style.backgroundColor;
    let eTh=document.getElementsByClassName("thh")
    let eTd=document.getElementsByClassName("tdd")
    let eTituloBase=document.getElementById("tituloBase")
    let basefondo = document.getElementById("basesita")
    let eForm = document.getElementById("form");
    let eLabels = document.getElementsByClassName("labels");
    let eTitulos = document.getElementsByClassName("titulo");
    let eH1 = document.getElementById("titulo");

    //aplicamos estilo que correspondan a cada contraste claro o escuro
    //comprobamos el fondo para identificar que contraste de colores estamos  
    if (fondo === "" || fondo === "white") {
        eBody.style.backgroundColor = "#1d2a35";

        // ciclo para recuperar la clase "labels" y poder aplicarles u nestilo
        for (let index = 0; index < eLabels.length; index++) {
            eLabels[index].style.color = "white";
        }
        eForm.style.backgroundColor = "grey";
        eH1.style.color = "white";
        basefondo.style.backgroundColor="grey"
        eTituloBase.style.color="white"

        // ciclo para recuperar la clase eTh que corresponde a parte de la tabla de datos para poder aplicarles estilo
        for (let index = 0; index < eTh.length; index++) {
            eTh[index].style.color="white"
        }
         // ciclo para recuperar la clase eTd que corresponde a parte de la tabla de datos para poder aplicarles estilo
        for (let index = 0; index < eTd.length; index++) {
            eTd[index].style.color="white"
            
        }
    } else { //ayuda a alternar el contraste de la pagina
        eBody.style.backgroundColor = "white";
        eTituloBase.style.color="black"

        // ciclo para recuperar la clase "labels" y poder aplicarles un estilo
        for (let index = 0; index < eLabels.length; index++) {
            eLabels[index].style.color = "#1d2a35";
        }
        eForm.style.backgroundColor = "white";

        // ciclo para recuperar la clase "eTitulos" y poder aplicarles un estilo
        for (let index = 0; index < eTitulos.length; index++) {
            eTitulos[index].style.color = "black";
        }

         // ciclo para recuperar la clase eTh que corresponde a parte de la tabla de datos para poder aplicarles estilo
        for (let index = 0; index < eTh.length; index++) {
            eTh[index].style.color="black"
        }        
        
        // ciclo para recuperar la clase eTd que corresponde a parte de la tabla de datos para poder aplicarles estilo
        for (let index = 0; index < eTd.length; index++) {
            eTd[index].style.color="black"
            
        }
        
        eH1.style.color = "black";
        basefondo.style.backgroundColor="white"
        
    

        
    }
}

// funcion para cambiar el tamaño de la fuente
function cambiarFuenteTamano() {
    let eForm = document.getElementById("form");
    let eH1 = document.getElementById("titulo");
    eH1.classList.toggle("cambiofuente1");

    let eLabels = document.getElementsByClassName("labels");

     // ciclo para recuperar la clase eLabels que corresponde a parte de la tabla de datos para poder aplicarles estilo de aumento de fuente y del formulario para no perder la estructura
    for (let index = 0; index < eLabels.length; index++) {
        eLabels[index].classList.toggle("cambiofuente2");
    }

    let altura = eForm.style.height;
    if(altura ==""){
        eForm.style.height="1300px"
    } 
    else{
        eForm.style.height="1020px";
    }
}

