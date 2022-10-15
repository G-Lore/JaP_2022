//Se concatena a la URL la key id de cada producto que se encuantra guardada en sus respectivos almacenamiento local.
const PRODUCTS_INFO = PRODUCT_INFO_URL + localStorage.getItem("id") + EXT_TYPE;

//Array donde se guardaran los datos obtenidos del JSON de product-info
let currentProductsInfoArray = [];


function setProductID(id) {
  localStorage.setItem("id", id);
  window.location = "product-info.html"
}

function setProductCartID(carrito) {
  localStorage.setItem("cart", JSON.stringify(currentProductsInfoArray));
  window.location = "cart.html"
}


//Función para mostrar la indormación de cada uno de los productos
function mostrar() {
  document.getElementById(
    "titulo"
  ).innerHTML = `<h1>${currentProductsInfoArray.name}</h1>`;

  let htmlContentToAppend = "";
//for que se utiliza para recorrer las imágenes de cada producto 
  for (let index = 0; index < currentProductsInfoArray.images.length; index++) {
    htmlContentToAppend += `<li onclick="changeImageSrc('${currentProductsInfoArray.images[index]}')">
    <img src="${currentProductsInfoArray.images[index]}" alt="" width="300px" style="padding-right: 20px;"></li>`;
  }

  document.getElementById("img").innerHTML = htmlContentToAppend;
  document.getElementById("imgZoom").innerHTML = `
  <h2>e · <span>mercado</span></h2><img src= "${currentProductsInfoArray.images[0]}" class="zoomImage">
    <table><tbody>
      <tr><td class="description_title">Descripción</td></tr>
      <tr><td class="description">${currentProductsInfoArray.description}</td></tr> 
      <tr><td class="price">Precio: ${currentProductsInfoArray.cost} ${currentProductsInfoArray.currency}</td></tr>
      <tr><td class="category_soldCount">Categoría: ${currentProductsInfoArray.category}</td><tr>
      <tr><td class="category_soldCount">Cantidad vendidos: ${currentProductsInfoArray.soldCount}</td></tr>
    </tbody></table> 
  <a onclick="setProductCartID(${currentProductsInfoArray.id})" class="add_cart"><i class="fas fa-shopping-cart"></i><span>_</span>Añadir al carrito</a>`;
  
  let similaryProducts = "";


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



//función con querySelector para seleccionar cada imágen y que según la imágen seleccionada aparezca en .zoomImage
function changeImageSrc(any) {
  document.querySelector(".zoomImage").src = any;
}

//Se procede a llamar el JSON de PRODUCTS_INFO
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_INFO).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsInfoArray = resultObj.data;
      mostrar();
    }
  });
});


//Se concatena a la URL la key id de cada producto que se encuantra guardada en sus respectivos almacenamiento local. 
//Se utiliza la URL guardada en el init.js PRODUCT_INFO_COMMENTS_URL para acceder a JSON de los comentarios
const PRODUCTS_COMENTS = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("id") + EXT_TYPE;
//Criterios de oredenación de las calificaciones 
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

                `<li><h3><strong>${currentCommentsArray[index].user} - </strong> ${currentCommentsArray[index].dateTime} <span>${puntuacion(currentCommentsArray[index].score)}</span></h3> 
                    <p>${currentCommentsArray[index].description}</p></li>`
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
1
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
        //console.log(fecha_y_hora_de_comentario);

        let nombre_usuario_de_comentario = localStorage.getItem("user");
        //console.log(nombre_usuario_de_comentario);

        let calificacion_de_comentario = document.getElementById('calificaID').selectedIndex;
        //console.log(calificacion_de_comentario);

        let comentario_nuevo = `
        <li>
            <h3>
                <strong>${nombre_usuario_de_comentario} -</strong> ${fecha_y_hora_de_comentario}

                ${puntuacion(calificacion_de_comentario)}
                
            </h3>
            <p>${commentario_ingresado}</p>
        </li>
        `;

        //console.log(comentario_nuevo);

        document.getElementById('list_comments').innerHTML = document.getElementById('list_comments').innerHTML + comentario_nuevo;

    }

    


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

document.getElementById("cerrar_sesion").addEventListener("click", cerrar);

function cerrar() {
   localStorage.removeItem('user');
   window.location.replace("login.html");
  }


document.addEventListener('DOMContentLoaded', ()=> {

    let nombre_usuario = localStorage.getItem('user');

    document.getElementById('person').innerHTML = nombre_usuario;

})

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

