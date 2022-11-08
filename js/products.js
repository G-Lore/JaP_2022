//Se concatena a la URL la key catID de cada categoría que se encuantra guardada en sus respectivos almacenamiento local.
const PRODUCTS_CAT = PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE;
//Criterios de oredenación de los productos 
const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DESC_BY_PRICE = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
//Array donde se guardaran los datos obtenidos del JSON
let currentProductsArray = [];
//Se inicializa variables con valor undefined
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

//Ordena los productos por criterios de ordenamiento definiendo previamente dichos criterios.
function sortProducts(criteria, array){
    
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    //Se define el criterio de orden ascendente a descendente de los costos de los producto
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    //Se define el criterio de orden descendente a ascendente de los costos de los producto
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    //Se define el criterio de ordenamiento segun la cantidad de artículos vendidos
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
} console.log(sortProducts)

function setProductID(id) {
    localStorage.setItem("id", id);
    window.location = "product-info.html"
}

//función para mostrar la lista de productos segun su id y se recorre cada una de los elementos.
function showProductsList(currentProductsArray){

    let htmlContentToAppend = "";
    
    for(let i = 0; i < currentProductsArray.length; i++){
        let prodList = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(prodList.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(prodList.soldCount) <= maxCount))){
            
            htmlContentToAppend +=
            `
            <div onclick="setProductID(${prodList.id})" class=" cursor-active">
                    <li class="listas">
                        <small class="">${prodList.soldCount} vendidos</small>
                        <table><tbody><tr>
                        <tr>
                        <td><img src="${prodList.image}" alt="${prodList.description}" class=""><td>
                            <td class="nombre_productos">${prodList.name} - ${prodList.cost} ${prodList.currency} 
                            <p>${prodList.description}</p></td>
                         </tr>
                        </tbody></table>
                    </li>
                </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}


function sortAndShowProducts(sortCriteria, ProductsArray){
    currentSortCriteria = sortCriteria;

    if(ProductsArray != undefined){
        currentProductsArray = ProductsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList(currentProductsArray);
}


//Función que se utiliza para ser utilizada despuén en la función "searching(currentProductsArray)"
//Va a tener la utilidad de no repetir las listas ordenadas por busquedas ya que se busca por dos arrays ditintos
//el de .name y el de .description
//Sin esta funciión la lista se repetiría y obtendríamos artículos duplicados.
Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
//El método splice() cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos.
                a.splice(j--, 1);
        }
    }

    return a;
};

//Array donde se va a guardar los elementos obtenidos de currentProductsArray.name
let currentSearchResultsArray1= [];

//Array donde se va a guardar los elementos obtenidos de currentProductsArray.description
let currentSearchResultsArray2= [];


//Función de búsqueda que va arrojar resultados según lo escrito en el input con id 'buscar'
function searching(currentProductsArray) {
    let searching_an_element = document.getElementById("buscar").value;

//Aquí se verifica todos los elementos que incluídos en currentProductsArray.name
    currentSearchResultsArray1 = currentProductsArray.filter( currentProductsArray => {
        return currentProductsArray.name.toLowerCase().includes(searching_an_element.toLowerCase());
    });

//Aquí se verifica todos los elementos que incluídos en currentProductsArray.description  
    currentSearchResultsArray2 = currentProductsArray.filter( currentProductsArray => {
        return currentProductsArray.description.toLowerCase().includes(searching_an_element.toLowerCase());
    });
//Se procede a concatenar los arreglos currentSearchResultsArray1 y currentSearchResultsArray2 
//para poder buscar artículos según su nombre y descripción.
    showProductsList(currentSearchResultsArray1.concat(currentSearchResultsArray2).unique());
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_CAT).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products
            showProductsList(currentProductsArray)

            //sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data.products);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList(currentProductsArray);
    });


    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList(currentProductsArray);
    });

    document.getElementById('buscar').addEventListener('keyup', ()=>{

        searching(currentProductsArray);
    })
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_CAT).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCatnameArray = resultObj.data
            document.getElementById('catname').innerHTML =  currentCatnameArray.catName;

        }
    });
});

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