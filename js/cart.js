const CART = CART_INFO_URL + "25801" + EXT_TYPE;

let currentCartArray = [];


function show_products_cart() {

    let subtotal = currentCartArray[0].currency + " " + currentCartArray[0].unitCost * currentCartArray[0].count;
    

    let addToCart ="";

    for (let index = 1; index < currentCartArray.length; index++) {
        
        addToCart += `
        <tr>
        <td class="cart_td"><img class="cart_img" src="${currentCartArray[index].images[0]}" width="150px"></td>
        <td class="cart_td">${currentCartArray[index].name}</td>
        <td class="cart_td">${currentCartArray[index].currency}${currentCartArray[index].cost}</td>
        <td class="cart_td"><input type="number" value="1" id="qty" class="cart_input"></td>
        <td class="cart_td" id="st">${currentCartArray[index].currency + " " + currentCartArray[index].cost * currentCartArray[0].count}</td>
    </tr>
        `    
    }


    
    document.getElementById('products_cart').innerHTML =
        ` 
        
     <h1 class="title">Carrito de compras</h1> 
      <h2 class="subtitle">Artículos a comprar</h2>
     <table class="cont_cart"> 
        <tbody>
            <tr>
                <th class="cart_th"></th>
                <th class="cart_th">Nombre</th>
                <th class="cart_th">Costo</th>
                <th class="cart_th">Cantidad</th>
                <th class="cart_th">Subtotal</th>
            </tr>
            <tr>
            <td class="cart_td"><img class="cart_img" src="${currentCartArray[0].image}" width="150px"></td>
            <td class="cart_td">${currentCartArray[0].name}</td>
            <td class="cart_td">${currentCartArray[0].currency}${currentCartArray[0].unitCost}</td>
            <td class="cart_td"><input type="number" value="${currentCartArray[0].count}" id="qty" class="cart_input"></td>
            <td class="cart_td" id="st"> ${subtotal}</td>
        </tr>
        <tr>
        ${addToCart}
        </tr>
        </tbody>
    </table>`
}

document.addEventListener('change', function(event){
    if(event.target && event.target.id == 'qty') {
        let subtotal = currentCartArray[0].currency + " " + currentCartArray[0].unitCost * qty.valueAsNumber ;
        console.log(subtotal)
        this.getElementById('st').innerHTML = subtotal;
     };
});


document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCartArray = resultObj.data.articles
            console.log(currentCartArray);
            let obtainNewProduct = localStorage.getItem('cart');
            currentCartArray.push(JSON.parse(obtainNewProduct));
            console.log(currentCartArray);
            show_products_cart()
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {

    let nombre_usuario = localStorage.getItem('user');

    document.getElementById('person').innerHTML = nombre_usuario;

})

document.getElementById("cerrar_sesion").addEventListener("click", cerrar);

function cerrar() {
    localStorage.removeItem('user');
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

menuToggle.onclick = function () {
    opciones.classList.toggle('active')
}

/*  */