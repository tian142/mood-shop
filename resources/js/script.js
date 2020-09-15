import data from './data.js';

const itemsContainer = document.getElementById('items');

// the length of our data determines how many times this loop goes around
for (let i = 0; i < data.length; ++i) {
    // create a new div element and give it a class name
    let newDiv = document.createElement('div');
    newDiv.className = 'item';

    // create an image element
    let img = document.createElement('img');
    // this will change each time we go through the loop. Can you explain why?
    img.src = data[i].image;
    img.width = 300;
    img.height = 300;

    // Add the image to the div
    newDiv.appendChild(img);
    // put new div inside items container
    itemsContainer.appendChild(newDiv);

    let imageDesc = document.createElement('p');
    imageDesc.innerText = data[i].name;
    newDiv.appendChild(imageDesc);

    let price = document.createElement('p');
    price.innerText = data[i].price;
    newDiv.appendChild(price);
    // imageTitle.appendChild;
    let button = document.createElement('button');
    button.id = data[i].name;
    button.dataset.price = data[i].price;
    button.innerHTML = 'Add to Cart';
    newDiv.appendChild(button);

    itemsContainer.appendChild(newDiv);
}
