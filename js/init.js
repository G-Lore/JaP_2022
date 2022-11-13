const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const CART = CART_INFO_URL + "25801" + EXT_TYPE;

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// Arreglo con los elementos del carrito de compras
// Se toma el carrito pre-cargado y se lo guarda en localStorage
// y de aquí en más solamente haremos uso de la información que está
// en localStorage y no llamaremos más al JSON inicial del carrito pre-cargado.
let currentCartArray = [];

console.log("Cargando Carrito de Compras");

if ( !(localStorage.hasOwnProperty("cart")) ) {
    console.log("No hay carrito, vamos a crear uno");
    getJSONData(CART).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCartArray = resultObj.data.articles;
            localStorage.setItem("cart", JSON.stringify(currentCartArray));
            console.log(currentCartArray);
        }
    });
} else {
  console.log("Ya existe elementos del carrito en localStorage");
}

function loadImageProfile() {
  if (localStorage.getItem('profile') !== null) {
    datosDelPerfil = JSON.parse(localStorage.getItem('profile'));
    document.getElementById("userImageProfile").src=datosDelPerfil.fotoDePerfil;
  }
}