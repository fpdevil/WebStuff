document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {id: 1, name: "Product 1", price: 17.08},
        {id: 2, name: "Product 2", price: 31.57},
        {id: 3, name: "Product 3", price: 25.52},
        {id: 4, name: "Product 4", price: 11.97},
    ];

    const cart = [];

    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartTotal = document.getElementById('cart-total');
    const totalItemPrice = document.getElementById('total-price');
    const checkOutBtn = document.getElementById('checkout-btn');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add To Cart</button>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            // console.log(`clicked ${typeof event.target.getAttribute('data-id')} ${event.target.getAttribute('data-id')}`);
            const productId = parseInt(event.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    cartItems.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const productId = parseInt(event.target.getAttribute('item-id'));
            const product = cart.find(p => p.id === productId);
            removeFromCart(product);
        }
    });
    
    function addToCart(product) {
        cart.push(product);
        displayCart();
    }

    function removeFromCart(product) {
        cart.pop(product);
        displayCart();
    }

    function displayCart() {
        cartItems.innerText = '';
        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCart.classList.add('hidden');
            cartTotal.classList.remove('hidden');

            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart');
                cartItem.setAttribute('item-id', item.id);
                cartItem.innerHTML = `
                    <span>$${item.price.toFixed(2)} - ${item.name}</span>
                    <button btn-id="${item.id}">Delete</button>
                `;
                cartItems.append(cartItem);

                totalItemPrice.textContent = `$${totalPrice.toFixed(2)}`;
            });
        } else {
            emptyCart.classList.remove('hidden');
            totalItemPrice.textContent = `$0.00`;
        }
    }

    checkOutBtn.addEventListener('click', () => {
        cart.length = 0;
        alert('Checkout Success!');
        displayCart();
    });
});