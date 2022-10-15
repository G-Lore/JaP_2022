
// Cada vez que entramos aquí cargamos lo que hay en localStorage para asegurarnos de cargar todos
// los elemento del carrito
currentCartArray = (JSON.parse(localStorage.getItem('cart')));
console.log(currentCartArray);

// Función para mostrar los elementos del carrito
function show_products_cart() {

    let addToCart = "";

    for (let index = 0; index < currentCartArray.length; index++) {

        addToCart += `
        <tr>
            <td class="cart_td"><img class="cart_img" src="${currentCartArray[index].image}" width="150px"></td>
            <td class="cart_td">${currentCartArray[index].name}</td>
            <td class="cart_td">${currentCartArray[index].currency}${currentCartArray[index].unitCost}</td>
            <td class="cart_td"><input type="number"  min="1" value="${currentCartArray[index].count}" id="${index}_qty" class="cart_input"></td>
            <td class="cart_td" id="${index}_st">${currentCartArray[index].currency + " " + currentCartArray[index].unitCost * currentCartArray[index].count}</td>
        </tr>`
    }

    document.getElementById('products_cart').innerHTML =
     `<h1 class="title">Carrito de compras</h1> 
      <h2 class="subtitle">Artículos a comprar</h2>
        <table class="cont_cart" id="prodList"> 
            <tbody>
                <tr>
                    <th class="cart_th"></th>
                    <th class="cart_th">Nombre</th>
                    <th class="cart_th">Costo</th>
                    <th class="cart_th">Cantidad</th>
                    <th class="cart_th">Subtotal</th>
                </tr>

                ${addToCart}

            </tbody>
        </table>`
}

// Creamos un EventListener que detecta cambios, entonces cuando detecta un cambio ejecuta 
//
document.addEventListener('change', function (event) {

    if (event.target.valueAsNumber >= 1 ) {
        let indx = event.target.id.charAt(0);
        let st = indx + "_st";

        // Guardo la cantidad en localStorage
        currentCartArray[indx].count++;
        localStorage.setItem("cart", JSON.stringify(currentCartArray));

        let subtotal = currentCartArray[indx].currency + " " + currentCartArray[indx].unitCost * event.target.valueAsNumber;

        this.getElementById(st).innerHTML = subtotal;
    }

});

document.addEventListener("DOMContentLoaded", function () {

    show_products_cart()
    
});

// Se muestra el nombre de ususario, obteniendo este desde localStorage con localStorage.getItem ('user'(key del usuario))
// y luego lo muestro con innerHTML en la barra de navegación, obreniendo previamente, el id 'person' 
// que pertenece a una etiqueta HTML <p></p> donde se va a mostrar el nombre del usuario.  
document.addEventListener('DOMContentLoaded', () => {

    let nombre_usuario = localStorage.getItem('user');

    document.getElementById('person').innerHTML = nombre_usuario;

})

// Para cerrar seción se obtiene el id "cerrar_sesion" de una etiqueta HTML <li></li>.
// Posteriormente con un eventListener "click" sobre el id previamente obtenido se crea una fiunción cerrar() 
// donde se remueve la key 'user' con localStorage.removeItem y luego con window.location.remplace volvemos a 
// mostrar la página de "login.html" para que la persona si lo desea vuelva a loggearse.
document.getElementById("cerrar_sesion").addEventListener("click", cerrar);

function cerrar() {
    localStorage.removeItem('user');
    window.location.replace("login.html");
}

// Para ir a "mi perfil" se obtiene el id "mi_perfil" de una etiqueta HTML <li></li>.
// Posteriormente con un eventListener "click" sobre el id previamente obtenido se crea una fiunción miPerfil() 
// donde con window.location.remplace redirigiremos al usuario a la página "my-profile.html".
document.getElementById("mi_perfil").addEventListener('click', miPerfil);

function miPerfil() {
    window.location.replace("my-profile.html");
}

// Para ir a "mi carrito" se obtiene el id "mi_carrito" de una etiqueta HTML <li></li>.
// Posteriormente con un eventListener "click" sobre el id previamente obtenido se crea una fiunción miCarrito() 
// donde con window.location.remplace redirigiremos al usuario a la página "cart.html".
document.getElementById("mi_carrito").addEventListener('click', miCarrito);

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

menuToggle.onclick = function () {
    opciones.classList.toggle('active')
}