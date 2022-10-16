function login (){

    let usuario = document.getElementById('user_email').value;
    let clave = document.getElementById('clave').value;

    miStorage = window.localStorage;

    if (usuario==="" || clave===""){
        document.getElementById('user_email').classList.add('error');
        document.getElementById('clave').classList.add('error');
        Swal.fire({
            position: 'center',
            color: '#ffa533',
            imageUrl: 'https://www.smileysapp.com/gif-emoji/dont-know.gif',
            title: 'Oops! algo anduvo mal, por favor intenta ingrsar tus datos nuevamente.',
            showConfirmButton: true,
            confirmButtonColor: '#8dcb00',
            backdrop: ` rgba(255,145,0,0.4)`,
          })
    }else {
        localStorage.setItem('user', usuario);
        window.location='index.html';

    }
}

document.addEventListener('DOMContentLoaded',()=>{
      document.getElementById('inicio').addEventListener('click',()=>{
        login();
      })

}) 


