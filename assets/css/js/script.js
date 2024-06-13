import { registrarUsuariosBase,obtenerUsuarios,eliminarUsuario,actualizarUsuarioBase } from "./promesas.js";

// Configuración de eventos cuando la página se carga
window.addEventListener("load", () => {
    document.getElementById("btnEnviar").addEventListener("click",verificaryregistarCampos );
    document.getElementById("btnContraste").addEventListener("click", cambiarContraste);
    document.getElementById("btnFuente").addEventListener("click", cambiarFuenteTamano);

    cargarDatos()
    document.getElementById("btnActualizar").addEventListener("click",actualizarUsuario)
});

// Función para manejar el registro del usuario
const verificaryregistarCampos = () => {
    if (validar()) {
        registrarUsuarios();
        cargarDatos();
    } 
    else {
        alert("complete todos los campos correctamente.");
    }
};



// Función para registrar usuarios
const registrarUsuarios = () => {
    // Obtención de los valores de los campos del formulario
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eEmail = document.getElementById("email");
    let eTelefono = document.getElementById("telefono");
    let eDireccion = document.getElementById("direccion");
    let eUsuario = document.getElementById("usuario");

    // Creación del objeto usuario registrado
    let usuarioregistrado = {
        nombre: eNombre.value,
        apellido: eApellido.value,
        email: eEmail.value,
        telefono: eTelefono.value,
        direccion: eDireccion.value,
        usuario: eUsuario.value
    };

    console.log(usuarioregistrado);

    // Registro del usuario en la base de datos
    registrarUsuariosBase(usuarioregistrado).then(() => {
        alert("Se registró con éxito");
        console.log("se registro")
    }).catch((error) => {
        alert("No se pudo registrar");
        console.log(error);
    });
}

const cargarDatos = ()=>{
    //traer de las promesas todo lo registrado
    obtenerUsuarios().then((usuario) =>{
        console.log(usuario)
        //cargarlo en la tabla del html
        let estructura = ""
        usuario.forEach((p) =>{
            estructura += "<tr>"
            estructura += "<td>" +p.nombre+"</td>"
            estructura += "<td>" +p.apellido+"</td>"
            estructura += "<td>" +p.email+"</td>"
            estructura += "<td>" +p.telefono+"</td>"
            estructura += "<td>" +p.direccion+"</td>"
            estructura += "<td>" +p.usaurio+"</td>"
            estructura += "<td><button id='UPD"+p.id+"'>actualizar</button></td>"
            estructura += "<td><button id='DEL"+p.id+"'>eliminar</button></td>"
            estructura +="</tr>";
            
        })
        document.getElementById("cuerpoTabla").innerHTML=estructura;
        usuario.forEach((p)=>{
            let elemento = document.querySelector("#UPD"+p.id);
            if(elemento){
                elemento.addEventListener("click",()=>{
                    document.getElementById("nombre").value = p.nombre;
                    document.getElementById("apellido").value = p.apellido;
                    document.getElementById("email").value = p.email;
                    document.getElementById("telefono").value = p.telefono;
                    document.getElementById("direccion").value = p.direccion
                    document.getElementById("usuario").value = p.usuario 
                    document.getElementById("btnActualizar").value = p.id
            });
        }
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
const actualizarUsuario=()=>{
    let eNombre=document.getElementById("nombre")
    let eApellido=document.getElementById("apellido")
    let eEmail=document.getElementById("email")
    let eTelefono=document.getElementById("apellido")
    let eDireccion=document.getElementById("direccion")
    let eUsuario=document.getElementById("usuario")

    let vNombre= eNombre.value
    let vApellido= eApellido.value
    let vEmail= eEmail.value
    let vTelefono= eTelefono.value
    let vDireccion=eDireccion.value
    let vUsuario= eUsuario.value

    let UPDusuario={nombre:vNombre.value,apellido:vApellido.value,
        email:vEmail.value,telefono:vTelefono.value,direccion:vDireccion.value,usuario:vUsuario.value}
        
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
        document.getElementById("btnActualizar").value=""
    }).catch((e)=>{
        alert("No se pudo actualizar al usuario.")
        console.log(e)
    })
}

// Función de validación principal
function validar() {
    let valido = true;
    valido &= validarVacio("nombre");
    valido &= validarVacio("apellido");
    valido &= validarVacio("email");
    valido &= validarLongitud("telefono");
    valido &= validarVacio("direccion");
    valido &= validarVacio("usuario");
    return valido;
}

// Función para validar si un campo está vacío
function validarVacio(idCampo) {
    let eForm = document.getElementById("form");
    let elemento = document.getElementById(idCampo);
    let valor = elemento.value.trim();
    let eID = document.getElementById("p" + idCampo);
    let EsValido = valor !== "";

    if (!EsValido) {
        elemento.style.border = "1px solid red";
        eID.style.display = "block";
        eID.style.color = "red";
        eForm.style.height="1000px"
    } else {
        elemento.style.border = "1px solid green";
        eID.style.display = "none";
    }

    return EsValido;
}

// Función para validar la longitud del teléfono
function validarLongitud(idCampo) {
    let elemento = document.getElementById(idCampo);
    let valor = elemento.value.trim();
    let eID = document.getElementById("p" + idCampo);
    let isValid = valor.length === 9 || valor.length === 0;

    if (!isValid) {
        elemento.style.border = "1px solid red";
        eID.style.display = "block";
        eID.style.color = "red";
    } else {
        elemento.style.border = "1px solid green";
        eID.style.display = "none";
    }

    return isValid;
}

// Función para cambiar el contraste de la página
function cambiarContraste() {
    let eBody = document.body;
    let fondo = eBody.style.backgroundColor;
    let eForm = document.getElementById("form");
    let eLabels = document.getElementsByClassName("labels");
    let eTitulos = document.getElementsByClassName("titulo");
    let eH1 = document.getElementById("titulo");

    if (fondo === "" || fondo === "white") {
        eBody.style.backgroundColor = "#1d2a35";
        for (let index = 0; index < eLabels.length; index++) {
            eLabels[index].style.color = "white";
        }
        eForm.style.backgroundColor = "grey";
        eH1.style.color = "white";
    } else {
        eBody.style.backgroundColor = "white";
        for (let index = 0; index < eLabels.length; index++) {
            eLabels[index].style.color = "#1d2a35";
        }
        eForm.style.backgroundColor = "white";
        for (let index = 0; index < eTitulos.length; index++) {
            eTitulos[index].style.color = "black";
        }
        eH1.style.color = "black";
    }
}

// Función para cambiar el tamaño de la fuente
function cambiarFuenteTamano() {
    let eForm = document.getElementById("form");
    let eH1 = document.getElementById("titulo");
    eH1.classList.toggle("cambiofuente1");

    let eLabels = document.getElementsByClassName("labels");
    for (let index = 0; index < eLabels.length; index++) {
        eLabels[index].classList.toggle("cambiofuente2");
    }

    let altura = eForm.style.height;
    if(altura =="800px"){
        eForm.style.height="800px"
    } 
    else{
        eForm.style.height="950px";
    }
}

