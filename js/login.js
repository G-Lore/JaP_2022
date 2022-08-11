function login (){

    let usuario = document.getElementById("user_email").value;
    let clave = document.getElementById("clave").value;

    if (usuario==="" || clave===""){
        alert ("Debe ingresar email y contraseña");
    }else {
        location.href='index.html';
    }
}

document.addEventListener('DOMContentLoaded',()=>{
      document.getElementById('inicio').addEventListener('click',()=>{
        login();
      })

})