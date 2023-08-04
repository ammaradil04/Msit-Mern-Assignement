// Product conttroller - it is glue b/w model and view
// controller - I/O viewlayer
// Data Exchange b/w view and model  <script>

import productOperations from "../services/product-operations.js"
// import options from "../payment/razorpay.js";

// window.addEventListener(
//     'load', bindevents()
// )


async function loadPizzas() {
    const pizzas = await productOperations.loadProducts();
    console.log('Pizzas are ', pizzas);
    // METHOD2: innerHtml -> disadvtg is it can be accesss using inspect

    // const rowdiv = document.getElementById('loaddata');
    // let pizzalen = pizza.length;
    // for(let index = 0; index < pizzalen; index++) {
    //     const col = document.createElement('div'); //dynamically creating the elements
    //     col.classList.add('col-4');
    //     col.innerHTML=`
    //     <div class='card'>
    //                         <img src="" class="${pizza[index].url}" alt="...">
    //                         <div class="card-body">
    //                             <h5 class="card-title">${pizza[index].name}</h5>
    //                             <p class="card-text">${pizza[index].desc}</p>
    //                             <a href="#" class="btn btn-success btn-primary col-12">Add to cart</a>
    //                         </div>
    //                     </div>`
    //     ;
    //     rowdiv.appendChild(col);  // appending on the browser page              
    // }
    for (let pizza of pizzas) {
        preparePizzaCard(pizza);
    }
}

loadPizzas();

// METHOD1: line by line 
/*

    <div class="col-4">
        <div class="card m-2">
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
                class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the
                bulk of the card's content.</p>
                <a href="#" class="btn btn-success btn-primary  col-12">Add to cart</a>
            </div>
        </div>
    </div>
*/

// JSX(dynamic HTML) -> write as it is HTML syntax but internally it implement as it is in below code for implment the code above for card , but dynamically
// Parser -> compile JSX 

// function addPizzaToCart(){
//     const pizzaId = this.getAttribute('product-id');
//     console.log('Current Button Clicked ', pizzaId);
//     const pizza = productOperations.search(pizzaId);
//     console.log('Pizza ', pizza);
//     const pizzaCart = productOperations.getProductsInCart();
    // if (pizzaCart.isAddedInCart) {
    //     this.className = 'btn btn-danger';
    //     this.innerText = 'Remove from Cart';
    //     productOperations.addToCart(pizza);
    // }
    // else {
    //     this.className = 'btn btn-primary';
    //     this.innerText = 'Add in Cart';
    //     // productOperations.removeFromCart(pizza);
    // }
//     printBasket();

// }

function addPizzaToCart() {
    // this - keyword (Current calling object reference)
    console.log('Add to Cart Called...', this);
    const currentButton = this;
    const pizzaId = currentButton.getAttribute('product-id');
    console.log('Pizza Id is ', pizzaId);
    const pizza = productOperations.search(pizzaId);
    if (pizza.isAddedInCart) {
        this.className = 'btn btn-success';
        this.innerText = 'Added in cart';
    }
    printBasket();
    printTotal();
    // checkoutBtn();
}

function printBasket() {
    const cartProducts = productOperations.getProductsInCart();
    const basket = document.querySelector('#carts');
    basket.innerHTML = '';
    for (let product of cartProducts) {
        const li = document.createElement('li');
        li.innerText = `${product.name} $${product.price}`;
        li.className = 'fw-semibold fs-5';
        basket.appendChild(li);
    }
}

function printTotal() {
    const cartProducts = productOperations.getProductsInCart();
    console.group('cardProducts are ', cartProducts);
    const cartProductsPrices = cartProducts.map(e => parseFloat(e.price));
    console.log('Prices of pizzas are ', cartProductsPrices);
    const totalBasket = document.querySelector('#total');
    totalBasket.innerHTML = '';
    const p1 = document.createElement('p');
    const defaultTotal = 0;
    let subTotal = 0
    subTotal = cartProductsPrices.reduce((prvs, crrnt) => crrnt = prvs+crrnt, defaultTotal);
    p1.className = 'fw-semibold';
    p1.innerText = `Subtotal  $${subTotal}`;
    totalBasket.appendChild(p1);
    const p2 = document.createElement('p');
    let totalTax = 0;
    totalTax = subTotal*0.18;
    p2.innerText = `Total Tax  $${totalTax}`
    totalBasket.appendChild(p2);
    const p3 = document.createElement('p');
    p3.className = 'fw-semibold';
    let totalAmout = totalTax + subTotal;
    p3.innerText = `Amount Payable:  $${totalAmout}`
    totalBasket.append(p3);
    // payment();
    // return totalAmout;
    // DOM for amount shown inside button
    // const basketButton = document.querySelector('#checkoutAmount');
    // basketButton.innerHTML = '';
    // const button = document.createElement('a');
    // a.className = 'btn btn-success'
    // a.innerText = totalAmout;
    // basketButton.appendChild(a);
}

// function payment(){
//     const paymentBasket = document.querySelector('#rzp-button1');
//     paymentBasket.makepayment();
// }

function preparePizzaCard(pizza) {
    // DOM is given below for the card code 
    const outputDiv = document.querySelector('#output')
    const colDiv = document.createElement('div');
    colDiv.className = 'col-4';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    colDiv.appendChild(cardDiv);
    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    cardDiv.appendChild(img);
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = pizza.desc;
    const button = document.createElement('button');
    button.setAttribute('Product-id', pizza.id);
    button.addEventListener('click', addPizzaToCart); // Bind Event Listner
    button.innerText = 'Add to Cart';
    button.className = 'btn btn-primary';
    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(button);
    outputDiv.appendChild(colDiv);
}

// export default printTotal;