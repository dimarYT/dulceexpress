// carta
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");


let total_mont = 0;

cartIcon.onclik = () => {
    cart.classList.add("active");
};
closeCart.onclik = () => {
    cart.classList.remove("active");
};
//la carta
if (document.readyState = "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}
//haciendo las funciones
function ready() {
    //remover items de la carta
    var removeCartButtons = document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem);
    }
    // cantidad de cambios
    var quantityInputs = document.getElementsByClassName("cart-quantity")
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //añadir a la carta
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //boton de pagar
    document.getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}
function buyButtonClicked() {
    alert("tu compra esta hecha");
    var cartContent = document.getElementsByClassName("cart-content")[0]
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}
//remover los items de la carta 
function removeCartItem(event) {
    var input = event.target;
    input.parentElement.remove();
    var showPrice = event.target.parentElement;
    var price = showPrice.getElementsByClassName("cart-price")[0].innerText;
    let priceNumber = parseFloat(price.substring(1, price.length));
    let quantity_total=parseFloat(showPrice.getElementsByClassName("cart-quantity")[0].value);
    let removePrice=priceNumber*quantity_total;
    ClaculeTotalPrice(-removePrice);
}
//cambios del precio
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    var showPrice = event.target.parentElement;
    let quentypre= parseFloat(showPrice.getElementsByClassName("quanty-pre")[0].innerText);
    total_mont=total_mont-quentypre;
    var price = showPrice.getElementsByClassName("cart-price")[0].innerText;

    let priceNumber = parseFloat(price.substring(1, price.length));
    let quantity_total=parseFloat(input.value);
    let quantyCalculed=(quantity_total * priceNumber);
    showPrice.getElementsByClassName("quanty-pre")[0].innerText=quantyCalculed;
    ClaculeTotalPrice(quantyCalculed);
}
//añadir a la carta
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    let priceNumber = parseFloat(price.substring(1, price.length));

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("ya has añadido este producto al carrito")
            return;
        }
        console.log(priceNumber)
    }

    var cartBoxContent = ` <img src="${productImg}" alt="" class="cart-img">
                         <div class="deatil-box">
                         <div class="cart-product-title">${title}</div>
                          <div class="cart-price">${price}</div>
                          <div style="display:none;" class="quanty-pre">${priceNumber}</div>
                          <input type="number" value="1" class="cart-quantity">
                        </div>
                         <!-- remover -->
                     <i class='bx bx-trash cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);

    ClaculeTotalPrice(priceNumber);

}

//cargar el total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;

    }
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;

}


function ClaculeTotalPrice(mont) {
    total_mont = total_mont + mont;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total_mont;
}