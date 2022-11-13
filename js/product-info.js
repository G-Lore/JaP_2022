//Se concatena a la URL la key id de cada producto que se encuantra guardada en sus respectivos almacenamiento local.
const PRODUCTS_INFO = PRODUCT_INFO_URL + localStorage.getItem("id") + EXT_TYPE;

//Array donde se guardaran los datos obtenidos del JSON de product-info
let currentProductsInfoArray = [];

currentCartArray = JSON.parse(localStorage.getItem('cart'));

// Función que llamamos con Onclick para cambiar el producto donde nos encontramos a un producto relacionado que seleccionemos.
// Dicho Onclick se encuentra en la línea número 10...algo de éste código dentro de una etiqueta <a></a>.
function setProductID(id) {
  localStorage.setItem("id", id);
  window.location = "product-info.html"
}

// Función que llamamos con Onclick para agregar al carrito un producto.
// Dicho Onclick se encuentra en la línea número 10...algo de éste código dentro de una etiqueta <a></a>.
function setProductCartID(carrito) {

  // creamos un objeto con el producto que queremos agregar a nuestro carrito con las características del JSON del carrito.
  // Tomamos solamente los datos que nos interesan para nuestro elemento del carrito. 
  let addedItemToCart = {
    count: 1,
    currency: currentProductsInfoArray.currency,
    id: currentProductsInfoArray.id,
    image: currentProductsInfoArray.images[0],
    name: currentProductsInfoArray.name,
    unitCost: currentProductsInfoArray.cost,    
  };

  // Con el método find buscamos si el producto ya está en nuestro carrito utilizando el id, si ya existe, entonces aumentamos 
  // solamente la cantidad en ese producto, si no existe agragamos el objeto con el nuevo producto al array del carrito.
  let repetido = currentCartArray.find((arr, i) => {
    if (arr.id === currentProductsInfoArray.id) {
      arr.count++;
      return true;
    }
  });

  if (!repetido) {
    currentCartArray.push(addedItemToCart);
  }

  // Aquí convertimos al arreglo en un cadena de string dado que en el localStorage no se puede almacenar otra cossa que no sea strings.
  // Para esto utilizamod JSON.stringify para justamente convertir este arreglo en string y que de esta manera podamos almacenar nuestro producto 
  // en el almacenamiento local. 
  // Es importante guardar en localStorage todos los productos del carrito (array), para que sea persistenete en todas las páginas mientras el usuario
  // está navegando. 
  localStorage.setItem("cart", JSON.stringify(currentCartArray));
  window.location = "cart.html"
}


// Función para mostrar la información de cada uno de los productos
function mostrar() {
  document.getElementById(
    "titulo"
  ).innerHTML = `<h1>${currentProductsInfoArray.name}</h1>`;

  let htmlContentToAppend = "";

  // for que se utiliza para recorrer las imágenes de cada producto.
  // Se utiliza onclick para hacer uso de la función changeImageSrc() que lo que hace es cambiar la imágen seleccionada
  // a la zona de imgZoom que es donde la imágen se muestra más grande que el resto.
  for (let index = 0; index < currentProductsInfoArray.images.length; index++) {
    htmlContentToAppend += `
    <li onclick="changeImageSrc('${currentProductsInfoArray.images[index]}')">
      <img src="${currentProductsInfoArray.images[index]}" alt="" width="300px" style="padding-right: 20px;">
    </li>
  `;
  }

  //Se muestra los detalles del producto, la primera imágen del producto que se encuentra en la posición 0,
  //descripción, costo, moneda, categoría a la que pertenece, y cantidad vendidos.
  //Esta información es mostrada dentro de una tabla, excepto la imágen que se encuentra dentro de una etiqueta HTML <img>.
  document.getElementById("img").innerHTML = htmlContentToAppend;

  document.getElementById("imgZoom").innerHTML = `
  <h2>e · <span>mercado</span></h2>
    <img src= "${currentProductsInfoArray.images[0]}" class="zoomImage">
      <table>
        <tbody>
          <tr>
            <td class="description_title">Descripción</td>
          </tr>
          <tr>
            <td class="description">${currentProductsInfoArray.description}</td>
          </tr> 
          <tr>
            <td class="price">Precio: ${currentProductsInfoArray.cost} ${currentProductsInfoArray.currency}</td>
          </tr>
          <tr>
            <td class="category_soldCount">Categoría: ${currentProductsInfoArray.category}</td>
          <tr>
          <tr>
            <td class="category_soldCount">Cantidad vendidos: ${currentProductsInfoArray.soldCount}</td>
          </tr>
        </tbody>
      </table> 
  <a onclick="setProductCartID(${currentProductsInfoArray.id})" class="add_cart"><i class="fas fa-shopping-cart"></i><span>_</span>Añadir al carrito</a>`;
  
  //Se comienza a recorrer los productos relacionados.
  let similaryProducts = "";

  //primero se recorre el primer producto que se encuentra en posición 0 para asignarlo al "carousel-item active",
  //esta clase se necesita para mostrar el primer elemento.
  similaryProducts += `
  
  <div class="carousel-item active">
    <a onclick="setProductID(${currentProductsInfoArray.relatedProducts[0].id})" class="cursor-active">
      <img src="${currentProductsInfoArray.relatedProducts[0].image}"  class="d-block w-100" alt="";">
    </a>
    <a onclick="setProductID(${currentProductsInfoArray.relatedProducts[0].id})" class="cursor-active">
      <h1>${currentProductsInfoArray.relatedProducts[0].name}</h1>
    </a>
  </div>

 `
  // Luego con un for comenzamos a recorrer los demás elementos que se encuentren dentro del array relatedProducts 
  // y le colocamos la clase a cada uno de ellos de "carousel-item" que es donde se muestra todos los demas productos despues del elemento 
  // "carousel-item active". Cabe destacar que el for empieza a inicializar la variable a partir de la posición 1 del array relatedProducts
  // dado que la posición 0 se utilizó para el elemento active que es el primero que se muestra.
  // Este Carousel lo podemos encontrar en Bootstrap versión 5.2.
  for (let index = 1; index < currentProductsInfoArray.relatedProducts.length; index++) {
    
    similaryProducts += `
    <div class="carousel-item">
      <a onclick="setProductID(${currentProductsInfoArray.relatedProducts[index].id})" class="cursor-active">
        <img src="${currentProductsInfoArray.relatedProducts[index].image}"  class="d-block w-100" alt="";">
      </a>
      <a onclick="setProductID(${currentProductsInfoArray.relatedProducts[index].id})" class="cursor-active">
        <h1>${currentProductsInfoArray.relatedProducts[index].name}</h1>
      </a>
    </div>
    
   `
  }

  // En este innerHTML lo utilizamos para comenzar con las primeras clases que necesitamos para obtener el Carousel,
  // luego, para también mostras los recorridos que hicimos anteriormente.
  // y por último para agregar controles de botones para ir atras o adelante que se obtienen utilizando las clases 
  // "carousel-control-prev" y carousel-control-next, 
  document.getElementById("productos_relacionados").innerHTML =  `
  <div id="myCarousel" class="carousel  carousel-dark slide" data-bs-ride="carousel" >
    <div class="carousel-inner">
      
      
        ${similaryProducts}
      
        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
  
    </div>
  </div>`;

let myCarousel = document.querySelector('#myCarousel');
let carousel = new bootstrap.Carousel(myCarousel);

}

// función con querySelector para seleccionar cada imágen y que según la imágen seleccionada aparezca en .zoomImage
// .zoomImage es la zona donde se muestran las imágenes en un tamaño mayor comparadas con el resto de las imágenes.
// Cuando seleccionamos la imágen (con el mouse en versión Desktop y con un touch en versión móvil) 
//ésta se va a mostrar en esta zona.
function changeImageSrc(any) {
  document.querySelector(".zoomImage").src = any;
}

// Se procede a llamar el JSON de PRODUCTS_INFO
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_INFO).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsInfoArray = resultObj.data;
      mostrar();
    }
  });
  loadImageProfile();
});


// Se concatena a la URL la key id de cada producto que se encuantra guardada en sus respectivos almacenamiento local. 
// Se utiliza la URL guardada en el init.js PRODUCT_INFO_COMMENTS_URL para acceder a JSON de los comentarios
const PRODUCTS_COMENTS = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("id") + EXT_TYPE;

// Criterios de oredenación de las calificaciones 
const ORDER_ASC_BY_STARS = "AZ";
const ORDER_DESC_BY_STARS = "ZA";

let currentSortCriteria = undefined;

let currentCommentsArray = [];

function sortComments(criteria, array){
    
  let result = [];
  if (criteria === ORDER_ASC_BY_STARS)
  //Se define el criterio de orden ascendente a descendente de la calificación del producto
  {
      result = array.sort(function(a, b) {
          if ( a.score > b.score ){ return -1; }
          if ( a.score < b.score ){ return 1; }
          return 0;
      });
  //Se define el criterio de orden descendente a ascendente de los calificación del producto
  }else if (criteria === ORDER_DESC_BY_STARS){
      result = array.sort(function(a, b) {
          if ( a.score < b.score ){ return -1; }
          if ( a.score > b.score ){ return 1; }
          return 0;
      });
  }

  return result;
} 

function sortAndShowComments(sortCriteria, CommentsArray){
  currentSortCriteria = sortCriteria;

  if(CommentsArray != undefined){
    currentCommentsArray = CommentsArray;
  }

  currentCommentsArray = sortComments(currentSortCriteria, currentCommentsArray);

  //Muestro los comentarios con las calificaciones ordenadas
  showComments(currentCommentsArray);
}

//función para mostrar comentarios
    function showComments() {

        let comentarios = "";

           for (let index = 0; index < currentCommentsArray.length; index++) {
            comentarios += 

                `
                <li>
                  <h3><strong>${currentCommentsArray[index].user} - </strong> ${currentCommentsArray[index].dateTime} <span>${puntuacion(currentCommentsArray[index].score)}</span></h3> 
                    <p>${currentCommentsArray[index].description}</p>
                </li>`
           }
           
           document.getElementById('list_comments').innerHTML = comentarios;
           document.getElementById('titulo_comentarios').innerHTML = `<h2>Comentarios</h2>`;
           document.getElementById('comentar').innerHTML =  `<h2>Comentar</h2> 
           <textarea name="" id="escribe_un_comentario" cols="100" rows="10" placeholder="Déjanos saber tu opinion..." ></textarea><br></br>
           <h2>Tu puntuación</h2>
           <select id="calificaID" >
              <option value=0>Califica el Producto</option>
              <option value=1>★</option>
              <option value=2>★★</option>
              <option value=3>★★★</option>
              <option value=4>★★★★</option>
              <option value=5>★★★★★</option>
          </select> <br></br>
         <button onclick='agregar_comentario()'>Enviar</button>`;
    }

    // Función para tranformar el score de los comentarios en estrellas
    function puntuacion(puntos) {
        let stars="";
        for (let i = 0; i < 5 ; i++) {
            if (i < puntos) {
                stars += `<i class="fas fa-star checked "></i>`;
            } else {
                stars += `<i class=" fas fa-star"></i>`;
            }

        }

        return stars;

    };

    // Función para agregare un comentario.
    function agregar_comentario() {

        let commentario_ingresado = document.getElementById('escribe_un_comentario').value;
        //console.log(commentario_ingresado);
        
        const fyh = new Date();
        let anio = fyh.getFullYear();
        let mes = fyh.getMonth() + 1;
        if (mes<10){
          mes = "0" + mes;
        } 
        let dia = fyh.getDate();
        let hora = fyh.getHours();
        let minutos = fyh.getMinutes();
        let segundos = fyh.getSeconds();

        let fecha_y_hora_de_comentario = anio + "-" + mes +"-" + dia + " " + hora + ":" + minutos + ":" + segundos;

        let nombre_usuario_de_comentario = localStorage.getItem("user");

        let calificacion_de_comentario = document.getElementById('calificaID').selectedIndex;

        let comentario_nuevo = `
        <li>
            <h3>
                <strong>${nombre_usuario_de_comentario} -</strong> ${fecha_y_hora_de_comentario}

                ${puntuacion(calificacion_de_comentario)}
                
            </h3>
            <p>${commentario_ingresado}</p>
        </li>
        `;

        document.getElementById('list_comments').innerHTML = document.getElementById('list_comments').innerHTML + comentario_nuevo;

    }

// Se procede a llamar el JSON de PRODUCTS_COMENTS
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_COMENTS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCommentsArray = resultObj.data
            console.log(currentCommentsArray)
            showComments()

        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
      sortAndShowComments(ORDER_ASC_BY_STARS);
  });

    document.getElementById("sortDesc").addEventListener("click", function(){
      sortAndShowComments(ORDER_DESC_BY_STARS);
  });

});

// Se muestra el nombre de ususario, obteniendo este desde localStorage con localStorage.getItem ('user'(key del usuario))
// y luego lo muestro con innerHTML en la barra de navegación, obreniendo previamente, el id 'person' 
// que pertenece a una etiqueta HTML <p></p> donde se va a mostrar el nombre del usuario.  
document.addEventListener('DOMContentLoaded', ()=> {

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

  menuToggle.onclick = function(){
    opciones.classList.toggle('active')
}

