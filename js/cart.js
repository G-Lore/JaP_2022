const emptyCartTemplate = ` <div class="products_cart_emptyy">
<div class="cont_gatito">
<img class="gatito" src="./img/4500_7_02.jpg" alt="">
<h1 class="empty_advertisement">Parece que tu carrito está vacío</h1>
<h3 class="empty_advertisement_i">Agrega productos para que gatito esté feliz</h3>
<h3 class="empty_advertisement_i">Haz click en el botón para ir a la tienda <i class="fas fa-store"></i></h3>
<a href="index.html" class="volver_tienda">Volver a tienda <img src="./img/v987-11a.jpg" alt="" class="paw"></a>
</div>
</div>
</div>`;


// Cada vez que entramos aquí cargamos lo que hay en localStorage para asegurarnos de cargar todos
// los elemento del carrito
currentCartArray = (JSON.parse(localStorage.getItem('cart')));
console.log(currentCartArray);

// Función para mostrar los elementos del carrito
function show_products_cart() {

    let addToCart = "";

    if (currentCartArray.length > 0) {
        
      document.body.classList.remove("algo");

        for (let index = 0; index < currentCartArray.length; index++) {

            addToCart += `
            <tr id="${index}_item">
                <td class="cart_td"><img class="cart_img" src="${currentCartArray[index].image}" width="150px"></td>
                <td class="cart_td">${currentCartArray[index].name}</td>
                <td class="cart_td">${currentCartArray[index].currency}${currentCartArray[index].unitCost}</td>
                <td class="cart_td"><input type="number"  min="1" value="${currentCartArray[index].count}" id="${index}_qty" class="cart_input"></td>
                <td class="cart_td" id="${index}_st">${currentCartArray[index].currency + " " + currentCartArray[index].unitCost * currentCartArray[index].count}</td>
                <td><i onclick='remover("${index}_item")' class="fas fa-times"></i></td>
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
            </table>
            <table class="cont_envio">
        <tr>
          <th class="envio_th">
            <h2><strong> Tipo de envío </strong></h2>
          </th>
        </tr>
        <tr>
          <td class="envio_td">
            <input type="radio" id="premium">
            <label for="premium">Premium 2 a 5 días (15%)</label>
          </td>
        </tr>
        <tr>
          <td class="envio_td">
            <input type="radio" id="express">
            <label for="express">Express 5 a 8 días (7%)</label>
          </td>
        </tr>
        <tr>
          <td class="envio_td">
            <input type="radio" id="standard">
            <label for="standard">Standard 12 a 15 días (5%)</label>
          </td>
        </tr>
        <tr>
          <th class="envio_th">
            <h2><strong>Dirección de envío</strong></h2>
          </th>
        </tr>
        <tr>
        <td class="envio_td">
        <input type="text" id="street" placeholder="Calle" class="envio_input">
        <label for="street"></label>
      </td>
      <td class="envio_td">
        <input type="text" id="number" placeholder="Número" class="envio_input">
        <label for="number"></label>
      </td>
      <tr>
        <td class="envio_td">
          <input type="text" id="corner" placeholder="Esquina" class="envio_input"> 
          <label for="corner"></label>
        </td>
      </tr>
    </tr>
      </table>
      `
    } else {
        document.getElementById('products_cart').innerHTML = emptyCartTemplate;
      
    } 
    
}

// Creamos un EventListener que detecta cambios, entonces cuando detecta un cambio determinamos usando
// expresiones regulares y método match en el string que proviene del id de donde se produjo el evento change,
// lo que hacemos es verificar que el id sea _qty y no cualquier otro, dado que como vamos a modificar el array
// de los productos tenemos que estar seguros de que el cambio provenga de donde tiene que venir.
document.addEventListener('change', function (event) {

    if ( event.target.id.match(/_qty/g)[0] != null || event.target.id.match(/_qty/g)[0] === '_qty' ) {

        let match = event.target.id.match(/(\d+)/);
        let indx = match[0];
        let st = indx + "_st";

        // Guardo la cantidad en localStorage
        currentCartArray[indx].count = event.target.valueAsNumber;
        localStorage.setItem("cart", JSON.stringify(currentCartArray));

        let subtotal = currentCartArray[indx].currency + " " + currentCartArray[indx].unitCost * event.target.valueAsNumber;

        this.getElementById(st).innerHTML = subtotal;
    }

});

document.addEventListener("DOMContentLoaded", function () {

    show_products_cart()
    
});

function remover(id_llamado) {
    console.log(id_llamado);
    let match = id_llamado.match(/(\d+)/);
    let indx = match[0];

    currentCartArray.splice(indx, 1);

    localStorage.setItem("cart", JSON.stringify(currentCartArray));

    var elem = document.getElementById(id_llamado);
    elem.parentNode.removeChild(elem);

    if(currentCartArray.length === 0) {
        var elem = document.getElementById('products_cart');
    elem.parentNode.removeChild(elem);

        document.body.classList.add("algo");

        document.getElementById('products_cart_empty').innerHTML = emptyCartTemplate;
        
    }    
    console.log(currentCartArray)
}

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