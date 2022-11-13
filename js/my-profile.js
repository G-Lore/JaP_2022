//Defino un objeto para guardar los datos modificados del perfil
let datosDelPerfil = {
  nombre: "",
  segundo_nombre: "",
  apellido: "",
  segundo_apellido: "",
  email: "",
  telefono_de_contacto: "",
  fotoDePerfil: "",
};

const inputProfilePhoto = document.getElementById("inputProfilePhoto");

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
          resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
          reject(error);
      };
  });
};

const uploadImage = async (event) => {
  const file = event.target.files[0];
  const base64 = await convertBase64(file);
  datosDelPerfil.fotoDePerfil = base64;

  document.getElementById("tableBanner").src=datosDelPerfil.fotoDePerfil;
};

inputProfilePhoto.addEventListener("change", uploadImage, false);



if (localStorage.getItem('profile') !== null) {
   datosDelPerfil = JSON.parse(localStorage.getItem('profile'));
   document.getElementById("tableBanner").src=datosDelPerfil.fotoDePerfil;
   document.getElementById("userImageProfile").src=datosDelPerfil.fotoDePerfil;
   document.getElementById('userProfileName').innerHTML = datosDelPerfil.nombre;
   document.getElementById('userProfileLastname').innerHTML = datosDelPerfil.apellido;
}else {
  datosDelPerfil.email = localStorage.getItem('user');
}
document.getElementById('primer_nombre').value = datosDelPerfil.nombre;
document.getElementById('segundo_nombre').value = datosDelPerfil.segundo_nombre;
document.getElementById('primer_apellido').value = datosDelPerfil.apellido;
document.getElementById('segundo_apellido').value = datosDelPerfil.segundo_apellido;
document.getElementById('email_perfil').value = datosDelPerfil.email;
document.getElementById('telefono_contacto').value = datosDelPerfil.telefono_de_contacto;
document.getElementById('tdp').submit;

function modifyProfile() {
   datosDelPerfil.nombre = document.getElementById('primer_nombre').value;
   datosDelPerfil.segundo_nombre = document.getElementById('segundo_nombre').value;
   datosDelPerfil.apellido = document.getElementById('primer_apellido').value;
   datosDelPerfil.segundo_apellido = document.getElementById('segundo_apellido').value;
   datosDelPerfil.email = document.getElementById('email_perfil').value;
   datosDelPerfil.telefono_de_contacto = document.getElementById('telefono_contacto').value;
  if (datosDelPerfil.nombre !== "" && datosDelPerfil.apellido !== "" && datosDelPerfil.email !== "") {
    localStorage.setItem('profile', JSON.stringify(datosDelPerfil));
  }
}
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})()



// Se muestra el nombre de ususario, obteniendo este desde localStorage con localStorage.getItem ('user'(key del usuario))
// y luego lo muestro con innerHTML en la barra de navegación, obreniendo previamente, el id 'person' 
// que pertenece a una etiqueta HTML <p></p> donde se va a mostrar el nombre del usuario.  
document.addEventListener('DOMContentLoaded', ()=> {

    let nombre_usuario = localStorage.getItem('user');

    document.getElementById('person').innerHTML = nombre_usuario;
    document.getElementById('userProfileEmail').innerHTML = nombre_usuario 
})
// Para cerrar seción se obtiene el id "cerrar_sesion" de una etiqueta HTML <li></li>.
// Posteriormente con un eventListener "click" sobre el id previamente obtenido se crea una fiunción cerrar() 
// donde se remueve la key 'user' con localStorage.removeItem y luego con window.location.remplace volvemos a 
// mostrar la página de "login.html" para que la persona si lo desea vuelva a loggearse.
document.getElementById("cerrar_sesion").addEventListener("click", cerrar);
function cerrar() {
   localStorage.clear();
   window.location.replace("login.html");
  }
// Para ir a "mi perfil" se obtiene el id "mi_perfil" de una etiqueta HTML <li></li>.
// Posteriormente con un eventListener "click" sobre el id previamente obtenido se crea una fiunción miPerfil() 
// donde con window.location.remplace redirigiremos al usuario a la página "my-profile.html".
document.getElementById("mi_perfil").addEventListener('click', miPerfil);
// Para ir a "mi perfil" se obtiene el id "mi_perfil" de una etiqueta HTML <li></li>.
// Posteriormente con un eventListener "click" sobre el id previamente obtenido se crea una fiunción miPerfil() 
// donde con window.location.remplace redirigiremos al usuario a la página "my-profile.html".
function miPerfil() {
      window.location.replace("my-profile.html");
  }
document.getElementById("mi_carrito").addEventListener('click', miCarrito);
// Para ir a "mi carrito" se obtiene el id "mi_carrito" de una etiqueta HTML <li></li>.
// Posteriormente con un eventListener "click" sobre el id previamente obtenido se crea una fiunción miCarrito() 
// donde con window.location.remplace redirigiremos al usuario a la página "cart.html".
function miCarrito() {
      window.location.replace("cart.html");
  }
// Funcionalidades para seleccionar los elemento del menú que creamos para el usuario
// el mismo es un menú que se desplega hacia abajo mostrandonos en primera instancia el nombre del usuario
// y luego al hacer click cobre éste se nos muestra las opciones "Mi perfil" "Mi carrito" y "Cerrar sesión"
// para crear este menú se utilizó querySelector que lo que hace es devolver el primer elemento del documento
// que coincida con el grupo especificado de selectores. 
let menuToggle = document.querySelector('.menuToggle');

let opciones = document.querySelector('.opciones');

menuToggle.onclick = function(){
    opciones.classList.toggle('active')
}