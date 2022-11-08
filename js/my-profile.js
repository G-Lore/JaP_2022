document.addEventListener('DOMContentLoaded', ()=> {

    let nombre_usuario = localStorage.getItem('user');

    document.getElementById('person').innerHTML = nombre_usuario;

})

document.getElementById("cerrar_sesion").addEventListener("click", cerrar);

function cerrar() {
   localStorage.clear();
   window.location.replace("login.html");
  }

document.getElementById("mi_perfil").addEventListener('click', miPerfil);

function miPerfil() {
      window.location.replace("my-profile.html");
  }
  
document.getElementById("mi_carrito").addEventListener('click', miCarrito);
  
function miCarrito() {
      window.location.replace("cart.html");
  }

let menuToggle = document.querySelector('.menuToggle');

let opciones = document.querySelector('.opciones');

menuToggle.onclick = function(){
    opciones.classList.toggle('active')
}