const cotizacion = 40;
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
let cartChekOut = {
  carrito_subtotal: 0,
  carrito_costo_envio: 0,
  carrito_envio: "ninguno",
  carrito_envio_ratio: 0,
  carrito_total: 0,
  carrito_metodo_pago: "ninguno",
  
};

// Cada vez que entramos aquí cargamos lo que hay en localStorage para asegurarnos de cargar todos
// los elemento del carrito
currentCartArray = (JSON.parse(localStorage.getItem('cart')));


function validacionCampos() {
  let numTarjeta = document.getElementById('numTarjetaDeCredito');
  let codTarjeta = document.getElementById('codTarjetaDeCredito');
  let vencTarjeta = document.getElementById('vencTarjetaDeCredito');
  let numCuenta = document.getElementById('numeroDeCuenta');
  
  let reultadoValidacion = true;
  
  if ( (numTarjeta.value && codTarjeta.value && vencTarjeta.value) || numCuenta.value ) {
    reultadoValidacion = true;
    document.getElementById("btn-modal-terminos").classList.remove("invalid-color");
    document.getElementById("feedback-modal-terminos").style.display = "none";
  }else{
    reultadoValidacion=false;
    document.getElementById("btn-modal-terminos").classList.add("invalid-color");
    document.getElementById("feedback-modal-terminos").style.display = "inline";
  }
  
  return reultadoValidacion
}

function camposCompletos() {
  let esquina = document.getElementById('validationCustom03');
  let calle = document.getElementById('validationCustom01');
  let numero = document.getElementById('validationCustom02');
  let premium = document.getElementById('envio_premium');
  let express = document.getElementById('envio_express');
  let standard = document.getElementById('envio_standard');
  let numTarjeta = document.getElementById('numTarjetaDeCredito');
  let codTarjeta = document.getElementById('codTarjetaDeCredito');
  let vencTarjeta = document.getElementById('vencTarjetaDeCredito');
  let numCuenta = document.getElementById('numeroDeCuenta');
  

  if (esquina.value && calle.value && numero.value && (premium.checked || express.checked || standard.checked) 
      && (numCuenta.value || (numTarjeta.value && codTarjeta.value && vencTarjeta.value))) {
       
  Swal.fire({
    position: 'center',
    color: '#8dcb00',
    imageUrl: './img/114597-cart-green.gif',
    title: 'Tu compra a sido realizada con éxito',
    showConfirmButton: true,
    confirmButtonColor: '#8dcb00',
    backdrop: ` #8ecb0053`,
  })
        
  }else {
    Swal.fire({
      position: 'center',
      color: '#10c183',
      imageUrl: './img/80582-empty-cart.gif',
      title: 'Oops! algo anduvo mal, por favor verifica que todos los campos estén completos.',
      showConfirmButton: true,
      confirmButtonColor: '#10c183',
      backdrop: `#2b6e92b9`,
    })
    
  }
}


// Función para mostrar los elementos del carrito
function show_products_cart() {

    let addToCart = "";

    if (currentCartArray.length > 0) {
        
      document.body.classList.remove("algo");

        for (let index = 0; index < currentCartArray.length; index++) {

            addToCart += `
            <tr id="${currentCartArray[index].id}_item">
                <td class="cart_td"><img class="cart_img" src="${currentCartArray[index].image}" width="150px"></td>
                <td class="cart_td">${currentCartArray[index].name}</td>
                <td class="cart_td">${currentCartArray[index].currency}${currentCartArray[index].unitCost}</td>
                <td class="cart_td"><input type="number"  min="1" value="${currentCartArray[index].count}" id="${index}_qty" class="cart_input"></td>
                <td class="cart_td" id="${index}_st">${currentCartArray[index].currency + " " + currentCartArray[index].unitCost * currentCartArray[index].count}</td>
                <td><i onclick='remover("${currentCartArray[index].id}_item")' class="fas fa-times"></i></td>
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
        <form class="row g-3 needs-validation" novalidate>
            <div  class="cont_envio">
            <table class="cont_envio_table">
        <tr>
          <th class="envio_th">
            <h2><strong> Tipo de envío </strong></h2>
          </th>
        </tr>
        <tr>
          <td class="envio_td">
            <div class="form-check">
              <input type="radio" id="envio_premium" name="tipo_envio" class="form-check-input" value="fast" required>
              <label for="premium" class="form-check-label">Premium 2 a 5 días (15%)</label>
            </div>
          </td>
        </tr>
        <tr>
          <td class="envio_td">
            <div class="form-check">
              <input type="radio" id="envio_express" name="tipo_envio" class="form-check-input" value="normal" required>
              <label for="express" class="form-check-label">Express 5 a 8 días (7%)</label>
            </div>
          </td>
        </tr>
        <tr>
          <td class="envio_td">
            <div class="form-check">
              <input type="radio" id="envio_standard" name="tipo_envio" class="form-check-input" value="slow" checked required>
              <label for="standard" class="form-check-label">Standard 12 a 15 días (5%)</label>
              <div class="invalid-feedback">
              Debe ingresar una clase de envío.
            </div>
            </div>
          </td>
        </tr>
        <tr>
          <th class="envio_th">
            <h2><strong>Dirección de envío</strong></h2>
          </th>
        </tr>
        
        <tr>
        <td class="envio_td">
        <input type="text" id="validationCustom01" placeholder="Calle" class="form-control envio_input" required>
        <label for="validationCustom01" class="form-label"></label>
          <div class="invalid-feedback">
              Por favor, escriba una calle.
            </div>
          <div class="valid-feedback">
                Correcto 🗸
            </div>
      </td>
      <td class="envio_td">
        <input type="text" id="validationCustom02" placeholder="Número" class="form-control envio_input" required>
        <label for="validationCustom02" class="form-label"></label>
        <div class="invalid-feedback">
              Por favor, escriba un número de puerta. 
            </div>
        <div class="valid-feedback">
                Correcto 🗸
            </div>
      </td>
      <tr>
        <td class="envio_td">
          <input type="text" id="validationCustom03" placeholder="Esquina" class="form-control envio_input" required> 
          <label for="validationCustom03" class="form-label"></label>
          <div class="invalid-feedback">
              Por favor, escriba una esquina.
            </div>
          <div class="valid-feedback">
            Correcto 🗸
            </div> 
        </td>
      </tr>
    <tr>
      <th class="envio_th">
        <h2><strong>Costos</strong></h2>
      </th>
    </tr>
    <tr class="costos">
        <td class="costos_td">
          <h4>Subtotal</h4>
           <p>Costo unitario del producto por cantidad</p>
        </td>
        <td class="costos_td">
          <h4 class="float-end me-4" id="cost_subtotal">USD ${cartChekOut.carrito_subtotal}<h4>
        </td>
    </tr>
    <tr class="costos">
    <td class="costos_td">
      <h4>Costo de envío</h4>
       <p>Según el tipo de envío</p>
    </td>
    <td class="costos_td">
      <h4 class="float-end me-4" id="cost_envio">USD ${cartChekOut.carrito_costo_envio}</h4>
    </td>
    </tr>
    <tr class="costos">
      <td class="costos_td">
        <h4>Total</h4>
      </td>
      <td class="costos_td">
        <h4 class="float-end me-4" id="total">USD ${cartChekOut.carrito_total}<h4>
      </td>
</tr>
<tr>
  <th class="envio_th">
    <h2><strong> Forma de Pago </strong></h2>
  </th>
</tr>
<tr>
  <th class="envio_th">
  <div class="form-check forma_de_pago">
    <p id="sinSeleccion" class="seleccion_pago">No haz seleccionado</p>
    <p id="tarjeta" class="seleccion_pago" style="display: none">Tarjeta de crédito</p>
    <p id="transferencia" class="seleccion_pago" style="display: none">Transferencia Bancaria</p>
    <div class="invalid-feedback">
       Por favor, escriba una esquina.
      </div>
    <a href="#" class="forma_de_pago_enlace" data-bs-toggle="modal" data-bs-target="#formaDePago" id="btn-modal-terminos">Seleccionar</a>  
    <span class="invalid-feedback modal-pago" id="feedback-modal-terminos">
    Debe elegir un método de pago 
    <br>y llenar todos los campos.
  </span>
        
  </th>
      </table>
<button  type="submit" class="boton_finalizar_compra" data-bs-toggle="modal" data-bs-target="#exampleModal">Finalizar Compra</button>
</div>


      <div class="modal fade" id="formaDePago" tabindex="-1" data-bs-backdrop="static"  data-bs-keyboard="false"  tabindex="-1 aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header formp">
            <h3 class="emercado" id="exampleModalLabel"><strong><span>e · </span>mercado</strong></h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
            <h3 class="formadeptitle">Forma de pago</h3><hr>
            <div class="form-check">
            <input type="radio" id="pago_tarjetaDeCredito" name="formaPago" value="" class="form-check-input credit-card-input" required>
            <label for="pago_tarjetaDeCredito" class="form-check-label credit_card">Tarjeta de crédito <img src="./img/4113361.jpg" alt="">
            </label>
            <div class="invalid-feedback invalidop">
            Debes elegir un método de pago
            </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text details_credit_card" id="basic-addon1">Nº de Tarjeta</span>
              <input type="text" id="numTarjetaDeCredito" name="" value="" class="form-control" required>
              <label for="numTarjetaDeCredito" class="form-label"></label>
            </div>
            <div class="input-group mb-3 mt-4">
              <span class="input-group-text details_credit_card" id="basic-addon2">Código de seg.</span>
              <input type="text" id="codTarjetaDeCredito" name="" value="" class="form-control" required>
              <label for="codTarjetaDeCredito" class="form-label"></label>
              <span class="input-group-text details_credit_card" id="basic-addon3">Vencimiento (MM/AA)</span>
              <input type="text" id="vencTarjetaDeCredito" name="" value="" class="form-control" required>
              <label for="vencTarjetaDeCredito" class="form-label"></label>
            </div>
            <div class="form-check">
            <input type="radio" id="pago_transferenciaBancaria" name="formaPago" value="" class="form-check-input transfer_banck_input" required>
            <label for="transferenciaBancaria" class="form-check-label transfer_banck">Transferencia Bancaria<img src="./img/6617.jpg" alt="">
            <div class="invalid-feedback ">
            Debes elegir un método de pago
            </div>
            </div>
            </label>
            <div class="input-group mb-3">
              <span class="input-group-text details_transfer_banck" id="basic-addon1">Número de cuenta</span>
              <input type="text" id="numeroDeCuenta" name="" value="" class="form-control" aria-label="Disabled input" required>
              <label for="numeroDeCuenta" class="form-label"></label>
             
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn cerrar_modal" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
    </form>
      `
    } else {
        document.getElementById('products_cart').innerHTML = emptyCartTemplate;
      
    } 
    (() => {
      'use strict'
      const forms = document.querySelectorAll('.needs-validation')
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!camposCompletos(), !validacionCampos() || !form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          event.preventDefault()
          form.classList.add('was-validated')
        }, false)
        let eventos=['change', 'input'];
  
  eventos.forEach( evento=> {document.body.addEventListener(evento, validacionCampos, camposCompletos)})
      })
    })()

 
}

function calcularCostos() {
  cartChekOut.carrito_subtotal = 0;
  
  for (let index = 0; index < currentCartArray.length; index++) {
    if ( currentCartArray[index].currency === "UYU" ) {
      cartChekOut.carrito_subtotal = cartChekOut.carrito_subtotal + currentCartArray[index].unitCost / cotizacion * currentCartArray[index].count;
    } else {
      cartChekOut.carrito_subtotal = cartChekOut.carrito_subtotal + currentCartArray[index].unitCost * currentCartArray[index].count;
    } 
  }

  if ( cartChekOut.carrito_envio === "envio_premium" ) {
    cartChekOut.carrito_envio_ratio = 0.15;
  } else if ( cartChekOut.carrito_envio === "envio_express" ) {
    cartChekOut.carrito_envio_ratio = 0.07;
  } else if ( cartChekOut.carrito_envio === "envio_standard") {
    cartChekOut.carrito_envio_ratio = 0.05;
  }

  cartChekOut.carrito_costo_envio =  cartChekOut.carrito_subtotal * cartChekOut.carrito_envio_ratio;

  cartChekOut.carrito_total = cartChekOut.carrito_costo_envio + cartChekOut.carrito_subtotal;
  
 
}

// Creamos un EventListener que detecta cambios, entonces cuando detecta un cambio determinamos usando
// expresiones regulares y método match en el string que proviene del id de donde se produjo el evento change,
// lo que hacemos es verificar que el id sea _qty y no cualquier otro, dado que como vamos a modificar el array
// de los productos tenemos que estar seguros de que el cambio provenga de donde tiene que venir.
document.addEventListener('change', function (event) {

    if ( (event.target.id.match(/_qty/g) != null) && (event.target.id.match(/_qty/g)[0] === '_qty') ) {

        let match = event.target.id.match(/(\d+)/);
        let indx = match[0];
        let st = indx + "_st";

        // Guardo la cantidad en localStorage
        currentCartArray[indx].count = event.target.valueAsNumber;
        localStorage.setItem("cart", JSON.stringify(currentCartArray));

        let subtotal = currentCartArray[indx].currency + " " + currentCartArray[indx].unitCost * event.target.valueAsNumber;

        this.getElementById(st).innerHTML = subtotal;
    } else if ( (event.target.id.match(/envio_/g) != null) && (event.target.id.match(/envio_/g)[0] === 'envio_') ) {
        cartChekOut.carrito_envio = event.target.id;
       
    } else if ( (event.target.id.match(/pago_/g) != null) && (event.target.id.match(/pago_/g)[0] === 'pago_') ) {
     
      if (event.target.id === 'pago_tarjetaDeCredito') {
        document.getElementById('numeroDeCuenta').setAttribute('disabled', '');
        document.getElementById('numTarjetaDeCredito').removeAttribute('disabled', '');
        document.getElementById('vencTarjetaDeCredito').removeAttribute('disabled', '');
        document.getElementById('codTarjetaDeCredito').removeAttribute('disabled', '');
        cartChekOut.carrito_metodo_pago = "tarjeta";
        imprimirOpcionDePago();
        
      } else if (event.target.id === 'pago_transferenciaBancaria') {
        document.getElementById('numTarjetaDeCredito').setAttribute('disabled', '');
        document.getElementById('vencTarjetaDeCredito').setAttribute('disabled', '');
        document.getElementById('codTarjetaDeCredito').setAttribute('disabled', '');
        document.getElementById('numeroDeCuenta').removeAttribute('disabled', '');
        cartChekOut.carrito_metodo_pago = "banco";
        imprimirOpcionDePago();
       
      }
    }

    calcularCostos();
    document.getElementById("cost_subtotal").innerHTML = "USD" + " " + cartChekOut.carrito_subtotal.toFixed(2);
    document.getElementById("cost_envio").innerHTML = "USD" + " " + cartChekOut.carrito_costo_envio.toFixed(2);
    document.getElementById("total").innerHTML = "USD" + " " + cartChekOut.carrito_total.toFixed(2);
        
});

document.addEventListener("DOMContentLoaded", function () {
    calcularCostos();
    show_products_cart();
});

function remover(id_llamado) {
  
    let prod_id = id_llamado.match(/(\d+)/);
    let indx = currentCartArray.findIndex(product => product.id == prod_id[0]);
   

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
    calcularCostos();
    show_products_cart();
}

function imprimirOpcionDePago() {

  if (cartChekOut.carrito_metodo_pago === "banco" ) {
    document.getElementById('transferencia').setAttribute('style', '');

    document.getElementById('tarjeta').setAttribute('style', 'display: none');
    document.getElementById('sinSeleccion').setAttribute('style', 'display: none');
  } else if (cartChekOut.carrito_metodo_pago === "tarjeta") {
    document.getElementById('tarjeta').setAttribute('style', '');

    document.getElementById('transferencia').setAttribute('style', 'display: none');
    document.getElementById('sinSeleccion').setAttribute('style', 'display: none');
  } 
    
};


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
    localStorage.clear();
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