//Se concatena a la URL la key id de cada producto que se encuantra guardada en sus respectivos almacenamiento local.
const PRODUCTS_INFO = PRODUCT_INFO_URL + localStorage.getItem("id") + EXT_TYPE;

//Array donde se guardaran los datos obtenidos del JSON de product-info
let currentProductsInfoArray = [];

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
  document.getElementById("imgZoom").innerHTML = `<h2>e · <span>mercado</span></h2><img src= "${currentProductsInfoArray.images[0]}" class="zoomImage">
    <h1>Precio: ${currentProductsInfoArray.cost} ${currentProductsInfoArray.currency}</h1> <h3>Descripción</h3> 
    <p>${currentProductsInfoArray.description}</p> <h5>Categoría: ${currentProductsInfoArray.category}</h5> 
    <h6>Cantidad vendidos: ${currentProductsInfoArray.soldCount}</h6> <a href=""><i class="fas fa-shopping-cart"></i><span>_</span>Añadir al carrito</a>`;
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

                `<li><h3><strong>${currentCommentsArray[index].user} -</strong> ${currentCommentsArray[index].dateTime} <span>${puntuacion(currentCommentsArray[index].score)}</span></h3> 
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

