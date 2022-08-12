function login (){

    let usuario = document.getElementById('user_email').value;
    let clave = document.getElementById('clave').value;

    miStorage = window.localStorage;

    if (usuario==="" || clave===""){
        document.getElementById('user_email').classList.add('error');
        document.getElementById('clave').classList.add('error');
        alert ("Debe ingresar email y contraseña");
    }else {
        localStorage.setItem('user', usuario);
        location.href='index.html';
    }
}

document.addEventListener('DOMContentLoaded',()=>{
      document.getElementById('inicio').addEventListener('click',()=>{
        login();
      })

}) 