function validar(){
    validarVacio("nombre");
    validarVacio("apellido")
    validarVacio("email");
    validarLongitud("telefono");
    validarVacio("direccion");
    validarVacio("usuario");
}
function validarVacio(idCampo){
    let elemento = document.getElementById(idCampo);
    let eform = document.getElementById("form");
    console.log(elemento);
    let valor = elemento.value;
    console.log(valor);
    let eID = document.getElementById("p"+idCampo);
    if(valor.trim()==""||isNaN(valor)){
        eform.style.height="980px"
        elemento.style.border = "1px solid"
        elemento.style.borderColor = "red";
        eID.style.display = "block";
        eID.style.color="red";
    }
    else{
        elemento.style.borderColor = "green";
        eID.style.display = "none";
    }

}
function validarLongitud(idCampo){
    let elemento = document.getElementById(idCampo);
    console.log(elemento);
    let valor = elemento.value;
    console.log(valor);
    console.log(isNaN(valor))
    let eID = document.getElementById("p"+idCampo);
    if(isNaN(valor)){
        eID.innerText = "Debes ingresar un numero";
        eID.style.display = "block";
    }
    else{
        if(valor.trim().length == 9 || valor.trim().length == 0 ){
            elemento.style.borderColor = "green";
            eID.style.display = "none";
        }else{
            elemento.style.borderColor = "red";
            eID.style.display = "block";
        }
    }
}

function cambiarContraste(){
    let eBody = document.body;
    let fondo = eBody.style.backgroundColor;
    let eform = document.getElementById("form");
    let elabels=document.getElementsByClassName("labels");
    let etitulos=document.getElementsByClassName("titulo");
    let eheader= document.getElementById("headers")
    var eH1 = document.getElementById("titulo")
    

    
    if(fondo == ""|| fondo=="white"){
        eBody.style.backgroundColor = "#1d2a35";
        for (let index = 0; index < elabels.length; index++) {
            const element = elabels[index];
            element.style.color = "white";
        }
        eform.style.backgroundColor="grey";


        eH1.style.color="white"
        eheader.style.backgroundColor="grey";
    }else{
        eBody.style.backgroundColor = "white";
        for (let index = 0; index < elabels.length; index++) {
            const element = elabels[index];
            element.style.color = "#1d2a35";
        
        
        }
        eform.style.backgroundColor="white";
        for (let index = 0; index < etitulos.length; index++) {
            const element = etitulos[index];
            element.style.color = "black";
        }
        
        eH1.style.color="black"
        

    }
    
}

function cambiarFuenteTamano(){
    var eH1 = document.getElementById("titulo")
    eH1.classList.toggle("cambiofuente1")

    var elabels = document.getElementsByClassName("labels");
    for (var index = 0; index < elabels.length; index++) {
        elabels[index].classList.toggle("cambiofuente2");
    }

    let eform = document.getElementById("form");
        eform.style.height="900px"
}

