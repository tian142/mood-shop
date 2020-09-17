import data from './data.js';
const itemList = document.getElementById('item-list');

const itemsContainer = document.getElementById('items');

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

const cart = [];

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
            return;
        }
    }
};

const showItems = () => {
    const totalQty = getTotalQty();
    const totalPrice = getTotalPrice();
    for (let item of cart) {
        console.log(`-${item.name} $${item.price} x ${item.qty}`);
    }
    console.log(
        `you have ${totalQty} items in your cart, the total price is: $${totalPrice}`
    );
};

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

addItem('beef', '2.55');
addItem('boots', '49.99');
addItem('boots', '49.99');
addItem('boots', '49.99');
// addItem('boots', '49.99');
// addItem('boots', '49.99');
// addItem('boots', '49.99');
// addItem('joe', '0.1');

showItems();
removeItem('beef', 1);
removeItem('boots');

showItems();

itemList.innerHTML = '<li> Hello World</li>';
