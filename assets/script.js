function cambiarContraste(){
    let eBody = document.body;
    let fondo = eBody.style.backgroundColor;
    let eform = document.getElementById("forms");
    let elabels=document.getElementsByClassName("labels");
    if (fondo== "white"){
        eform.style.backgroundColor = "white";
        for (let index = 0; index < elabels.length; index++) {
            const element = elabels[index];
            element.style.color = "red";}
        }
     else {
        eform.style.backgroundColor = "grey";
    }
}

function validar(){
    validarVacio("nombre");
    validarVacio("apellido")
    validarVacio("email");
    validarVacio("usuario");
    validarLongitud("telefono");
}
function validarVacio(idCampo){

    let elemento = document.getElementById(idCampo);
    console.log(elemento);

    let valor = elemento.value;
    console.log(valor);

    let error = document.getElementById("p"+idCampo);
    if(valor.trim()==""){
        elemento.style.borderColor = "red";
        elemento.style.marginBottom="0px"
        elemento.style.boxShadow="0 0 10px red"
        error.style.display = "block";
        error.style.color="red";
    }else{
        elemento.style.boxShadow="0 0 10px green"
        elemento.style.borderColor = "green";
        error.style.display = "none";
    }
}

function validarLongitud(idCampo){
    let elemento = document.getElementById(idCampo);
    console.log(elemento);
    let valor = elemento.value;
    console.log(valor);
    console.log(isNaN(valor))
    let eParrafo = document.getElementById("p"+idCampo);
    if(isNaN(valor)){
        error.innerText = "Debes ingresar un numero";
        error.style.display = "block";
        eParrafo.style.color="red"
        elemento.style.boxShadow="0 0 10px red"
        elemento.style.backgroundColor="rgba(250, 0, 0, 0.051"
        elemento.style.display = "none";
    }
    else{
        if(valor.trim().length == 9 || valor.trim().length == 0 ){
            elemento.style.borderColor = "green";
        }else{
            
            elemento.style.boxShadow="0 0 10px red"
            elemento.style.borderColor = "red";
            eParrafo.style.display = "block";
            eParrafo.style.color="red"
       
        }}
    }

















































