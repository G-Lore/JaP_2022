const PRODUCTS_INFO = PRODUCT_INFO_URL + localStorage.getItem('id') + EXT_TYPE;

let currentProductsInfoArray = [];


function mostrar() {
    
    document.getElementById('titulo').innerHTML = `<h1>${currentProductsInfoArray.name}</h1>`;

    document.getElementById('descripcion').innerHTML = `<h3>Descripción</h3> <p>${currentProductsInfoArray.description}</p>
                                                        <h4>Categoría: ${currentProductsInfoArray.category}</h4>
                                                            <h4>Cantidad vendidos: ${currentProductsInfoArray.soldCount}</h4>`;

   
 
    

    let htmlContentToAppend = "";

    for (let index = 0; index < currentProductsInfoArray.images.length; index++) {

        htmlContentToAppend +=

            `<li onclick="changeImageSrc('${currentProductsInfoArray.images[index]}')"><img src="${currentProductsInfoArray.images[index]}" alt="" width="300px" style="padding-right: 20px;"></li>`;

        
    }
    
    document.getElementById('img').innerHTML = htmlContentToAppend; 
    document.getElementById('imgZoom').innerHTML = `<p>e · <span>mercado</span></p><img src= "${currentProductsInfoArray.images[0]}" class="zoomImage">
    <h1>${currentProductsInfoArray.cost} ${currentProductsInfoArray.currency}</h1> <a href="">Añadir al carrito</a>`
}

function changeImageSrc(any) {
    document.querySelector('.zoomImage').src = any;
}
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_INFO).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsInfoArray = resultObj.data
            mostrar()


        }
    });
});

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Comentarios

const PRODUCTS_COMENTS = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('id') + EXT_TYPE;


let currentCommentsArray = [];


    function showComments() {

        let comentarios = "";

           for (let index = 0; index < currentCommentsArray.length; index++) {
            comentarios += 

                `<div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${currentCommentsArray[index].user}</h4>
                        </div>
                        <p class="mb-1">${currentCommentsArray[index].description}</p>
                    </div>
                    </div>
                        <p class="mb-1">${currentCommentsArray[index].score}</p>
                    </div>
                    </div>
                        <p class="mb-1">${currentCommentsArray[index].dateTime}</p>
                    </div>
                </div>
            </div>`

           }
           document.getElementById('cat-list-container').innerHTML = comentarios;
    }



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_COMENTS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCommentsArray = resultObj.data
            console.log(currentCommentsArray)
            showComments()


        }
    });
});