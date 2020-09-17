import data from './data.js';

const itemsContainer = document.getElementById('items');
const itemList = document.getElementById('item-list');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');
const cart = [];

itemList.addEventListener('click', (e) => {
    // console.log('clicked');
    // console.log(e.target);
    if (e.target && e.target.classList.contains('removeBtn')) {
        const name = e.target.dataset.name; //named in the html creation in showItem
        // console.log(name);
        removeItem(name);
        // if (cart.length === 0) {
        //     itemList.removeAttribute();
        // }
        // console.log(cart);
    } else if (e.target && e.target.classList.contains('addOne')) {
        const name = e.target.dataset.name;
        addItem(name);
    } else if (e.target && e.target.classList.contains('minusOne')) {
        const name = e.target.dataset.name;
        removeItem(name, 1);
    }
    showItems();
});

data.forEach(function (item) {
    let newDiv = document.createElement('div');
    newDiv.className = 'item';
    let img = document.createElement('img');
    // img.src = item.image;
    img.width = 300;
    img.height = 300;
    newDiv.appendChild(img);

    let imageDesc = document.createElement('p');
    imageDesc.innerText = item.name;
    newDiv.appendChild(imageDesc);

    let price = document.createElement('p');
    price.innerText = item.price;
    newDiv.appendChild(price);

    let button = document.createElement('button');
    button.id = item.name;
    button.dataset.price = item.price;
    button.innerHTML = 'Add to Cart';
    newDiv.appendChild(button);

    itemsContainer.appendChild(newDiv);
});

const addItem = (name, price) => {
    for (let item in cart) {
        if (cart[item].name === name) {
            cart[item].qty += 1;
            return;
        }
    }
    const item = { name, price, qty: 1 };
    cart.push(item);
};

const removeItem = (name, qty = 0) => {
    for (let item in cart) {
        if (cart[item].name === name) {
            if (qty > 0) {
                cart[item].qty -= qty;
            }
            if (cart[item].qty < 1 || qty === 0) cart.splice(name, 1);
            showItems();
            return;
        }
    }
};

const showItems = () => {
    const totalQty = getTotalQty();
    const totalPrice = getTotalPrice();
    cartQty.innerHTML = `You have ${totalQty} items in your cart`;
    cartTotal.innerHTML = `Your cart's total is $${totalPrice}`;
    let itemStr = '';
    for (let item of cart) {
        // console.log(`-${item.name} $${item.price} x ${item.qty}`);
        const { name, price, qty } = item;
        itemStr += `<li> ${name} 
        $${price} x ${qty} = 
        $${(price * qty).toFixed(
            2
        )} <button class="removeBtn" data-name="${name}">Remove<button>
        <button class="addOne" data-name="${name}">+</button>
        <button class="minusOne" data-name="${name}">-</button>
        </li>
        
        `;
        itemList.innerHTML = itemStr;
    }
};
const allItemsButton = Array.from(document.querySelectorAll('button'));
allItemsButton.forEach((elt) =>
    elt.addEventListener('click', () => {
        addItem(elt.getAttribute('id'), elt.getAttribute('data-price'));
        showItems();
    })
);

const getTotalQty = () => {
    let totalQty = 0;
    for (let item of cart) {
        totalQty += item.qty;
    }
    return totalQty;
};

const getTotalPrice = () => {
    let totalPrice = 0;
    for (let item of cart) {
        totalPrice += item.price * item.qty;
    }
    return totalPrice.toFixed(2);
};

showItems();
