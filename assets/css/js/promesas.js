import {collection,addDoc,getDocs,doc,deleteDoc,updateDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {db} from "./firebase.js";


export const registrarUsuariosBase = async(usuarios)=>{
    const docRef = await addDoc(collection(db,"usuario"),usuarios );
}

export const obtenerUsuarios = async()=>{
    const ref = collection(db,"usuario");
    const qSnap = await getDocs(ref);
    let listado = []
    qSnap.forEach((doc) => {
        listado.push({...doc.data(),id:doc.id})

    });
    console.log(listado);document.getElementById
    return listado;
}

export const eliminarUsuario = async(id) =>{
    const ref = doc(db,"usuario",id);
    await deleteDoc (ref);
}

export const actualizarUsuarioBase = async(UPDusuario,id)=>{
    const ref=doc(db,"usuario",id);
    await updateDoc(ref,UPDusuario)
}