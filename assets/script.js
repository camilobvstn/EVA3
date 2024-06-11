function cambiarContraste(){
    let eform=document.getElementById("forms")
    let fondo=eform.style.backgroundColor
    let elabel=document.getElementsByClassName("labels")
    if (fondo=="white")
        eform.style.backgroundColor="grey"

    else{
        eform.style.backgroundColor="white"
        
    }
}

function validar(){
    validarVacio("nombre");
    validarVacio("apellido")
    validarVacio("email");
    validarLongitud("telefono");
    validarVacio("usuario");
}
function validarVacio(idCampo){

    let elemento = document.getElementById(idCampo);
    console.log(elemento);

    let valor = elemento.value;
    console.log(valor);

    let error = document.getElementById("p"+idCampo);
    if(valor.trim()==""){
        elemento.style.borderColor = "red";
        error.style.display = "block";
        error.style.color="red";
    }else{
        elemento.style.borderColor = "green";
        error.style.display = "none";
    }
}

















































