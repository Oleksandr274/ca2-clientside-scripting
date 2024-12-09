/* Pizza */

// fetch pizza information on openning details
const pizzasDetails = document.getElementById('pizzas-details');
pizzasDetails.addEventListener("toggle", () => {
    if (pizzasDetails.hasAttribute("open"))
        fetchPizzas(null, null);
});


// assign html elements to variables
const pizzaBtnSearch = document.getElementById('btn-pizza-search');
const pizzaSearchInput = document.getElementById('search-pizza');
const pizzaBtnFilter = document.getElementById('btn-pizza-filter');
const pizzaVegTypeCheckbox = document.getElementById('veg-type-checkbox');
const pizzaMinPriceInput = document.getElementById('pizza-min-price');


// add event listener to search pizza button
pizzaBtnSearch.addEventListener('click', () => {
    // reset filter values to default
    pizzaVegTypeCheckbox.checked = false;
    pizzaMinPriceInput.value = 0;

    console.log(pizzaSearchInput.value);
    fetchPizzas(pizzaSearchInput.value, null);
});

// add event listener to filter pizza button
pizzaBtnFilter.addEventListener('click', () => {
    // reset search input to default
    pizzaSearchInput.value = "";

    let isVeg = pizzaVegTypeCheckbox.checked;
    let minPrice = Number(pizzaMinPriceInput.value)
    if(isNaN(minPrice) || minPrice < 0){
        minPrice = 0;
        pizzaMinPriceInput.value = 0;
    }
    console.log(isVeg);
    console.log(minPrice);
    fetchPizzas(null, { isVeg, minPrice });
});

// Fetch and display pizzas
async function fetchPizzas(pizzaName, filterOption) {

    // API URL and options
    const url = 'https://pizza-and-desserts.p.rapidapi.com/pizzas/';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c1a9fa6a9emsha7ec5f75b7bfd01p1c0300jsn1426eea4383e',
            'x-rapidapi-host': 'pizza-and-desserts.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const pizzas = await response.json();

        // display pizzas depending on user's request
        if (pizzaName != null) {
            const searchedPizzas = pizzas.filter(pizza => pizza.name.includes(pizzaName));
            displayPizzas(searchedPizzas);
        }
        else if (filterOption != null) {
            let filteredPizzas = [];

            filteredPizzas = pizzas.filter(pizza => pizza.price >= filterOption.minPrice)

            if(filterOption.isVeg)
                filteredPizzas = filteredPizzas.filter(pizza => pizza.veg == true );
            displayPizzas(filteredPizzas);
        }
        else {
            displayPizzas(pizzas);
        }
    }
    catch (error) {
        document.getElementById('pizzas-container').textContent = `Error fetching pizza data: ${error.message}`;
    }
}

// Function to display pizzas
function displayPizzas(pizzas) {
    const pizzasContainer = document.getElementById('pizzas-container');
    pizzasContainer.innerHTML = "";

    pizzas.forEach(pizza => {
        //create pizza card element
        const pizzaCard = document.createElement('div');
        pizzaCard.classList.add("item-card");

        //create pizza image 
        const pizzaImage = document.createElement('img');
        pizzaImage.setAttribute('src', pizza.img);
        pizzaImage.setAttribute('alt', pizza.name);
        pizzaImage.style.width = "100%";
        pizzaImage.style.height = "auto";


        //create pizza name
        const pizzaNameDiv = document.createElement('div');
        pizzaNameDiv.classList.add('item-name');
        pizzaNameDiv.innerText = pizza.name;


        //create pizza information
        const pizzaInfoDiv = document.createElement('div');
        pizzaInfoDiv.classList.add('item-info');

        //create pizza description paragraph
        const pizzaDescription = document.createElement('p');
        pizzaDescription.innerText = pizza.description;

        //create vegetarian type with bold label and yes/no value
        const pizzaVegType = document.createElement('p');
        const vegLabelSpan = document.createElement('span');
        vegLabelSpan.innerText = "Vegetarian: ";
        vegLabelSpan.style.fontWeight = "bold";
        pizzaVegType.appendChild(vegLabelSpan);

        const vegTypeParag = document.createElement('p');
        vegTypeParag.style.display = "inline-block"
        vegTypeParag.innerText = pizza.veg ? 'Yes' : 'No';
        pizzaVegType.appendChild(vegTypeParag);

        //create price with bold label and price value
        const pizzaPrice = document.createElement('p');
        const priceLabelSpan = document.createElement('span');
        priceLabelSpan.innerText = "Price: ";
        priceLabelSpan.style.fontWeight = "bold";
        pizzaPrice.appendChild(priceLabelSpan);

        const priceParag = document.createElement('p');
        priceParag.innerText = '\u20AC' + pizza.price;
        priceParag.style.display = "inline-block"
        pizzaPrice.appendChild(priceParag);

        //add description, vegetarian type, price to pizza info
        pizzaInfoDiv.appendChild(pizzaDescription);
        pizzaInfoDiv.appendChild(pizzaVegType);
        pizzaInfoDiv.appendChild(pizzaPrice);


        //add all elements to pizza card
        pizzaCard.appendChild(pizzaImage);
        pizzaCard.appendChild(pizzaNameDiv);
        pizzaCard.appendChild(pizzaInfoDiv);


        //add pizza card to pizzas container
        pizzasContainer.appendChild(pizzaCard);
    })
}



/* Desserts */

// fetch pizza information on openning details
const dessertsDetails = document.getElementById('desserts-details');
dessertsDetails.addEventListener("toggle", () => {
    if (dessertsDetails.hasAttribute("open"))
        fetchDesserts(null, null);
});


// assign html elements to variables
const dessertBtnSearch = document.getElementById('btn-dessert-search');
const dessertSearchInput = document.getElementById('search-dessert');
const dessertBtnFilter = document.getElementById('btn-dessert-filter');
const dessertMinPriceInput = document.getElementById('dessert-min-price');


// add event listener to search dessert button
dessertBtnSearch.addEventListener('click', () => {
    // reset filter values to default
    dessertMinPriceInput.value = 0;

    console.log(dessertSearchInput.value);
    fetchDesserts(dessertSearchInput.value, null);
});

// add event listener to filter dessert button
dessertBtnFilter.addEventListener('click', () => {
    // reset search input to default
    dessertSearchInput.value = "";

    let minPrice = Number(dessertMinPriceInput.value)
    if(isNaN(minPrice) || minPrice < 0){
        minPrice = 0;
        dessertMinPriceInput.value = 0;
    }
    console.log(minPrice);
    fetchDesserts(null, minPrice );
});

// Fetch and display desserts
async function fetchDesserts(dessertName, minPrice) {

    // API URL and options
    const url = 'https://pizza-and-desserts.p.rapidapi.com/desserts';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c1a9fa6a9emsha7ec5f75b7bfd01p1c0300jsn1426eea4383e',
            'x-rapidapi-host': 'pizza-and-desserts.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const desserts = await response.json();

        // display desserts depending on user's request
        if (dessertName != null) {
            const searchedDesserts = desserts.filter(dessert => dessert.name.includes(dessertName));
            displayDesserts(searchedDesserts);
        }
        else if (minPrice != null) {
            const filteredDesserts = desserts.filter(dessert => dessert.price >= minPrice);
            displayDesserts(filteredDesserts);
        }
        else {
            displayDesserts(desserts);
        }
    }
    catch (error) {
        document.getElementById('desserts-container').textContent = `Error fetching desserts data: ${error.message}`;
    }
}

// Function to display desserts
function displayDesserts(desserts) {
    const dessertsContainer = document.getElementById('desserts-container');
    dessertsContainer.innerHTML = "";

    desserts.forEach(dessert => {
        //create dessert card element
        const dessertCard = document.createElement('div');
        dessertCard.classList.add("item-card");

        //create dessert image 
        const dessertImage = document.createElement('img');
        dessertImage.setAttribute('src', dessert.img);
        dessertImage.setAttribute('alt', dessert.name);
        dessertImage.style.width = "100%";
        dessertImage.style.height = "auto";


        //create dessert name
        const dessertNameDiv = document.createElement('div');
        dessertNameDiv.classList.add('item-name');
        dessertNameDiv.innerText = dessert.name;


        //create dessert information
        const dessertInfoDiv = document.createElement('div');
        dessertInfoDiv.classList.add('item-info');

        //create dessert description paragraph
        const dessertDescription = document.createElement('p');
        dessertDescription.innerText = dessert.description;


        //create price with bold label and price value
        const dessertPrice = document.createElement('p');
        const priceLabelSpan = document.createElement('span');
        priceLabelSpan.innerText = "Price: ";
        priceLabelSpan.style.fontWeight = "bold";
        dessertPrice.appendChild(priceLabelSpan);

        const priceParag = document.createElement('p');
        priceParag.innerText = '\u20AC' + dessert.price;
        priceParag.style.display = "inline-block"
        dessertPrice.appendChild(priceParag);

        //add description, vegetarian type, price to dessert info
        dessertInfoDiv.appendChild(dessertDescription);
        dessertInfoDiv.appendChild(dessertPrice);


        //add all elements to dessert card
        dessertCard.appendChild(dessertImage);
        dessertCard.appendChild(dessertNameDiv);
        dessertCard.appendChild(dessertInfoDiv);


        //add dessert card to desserts container
        dessertsContainer.appendChild(dessertCard);
    })
}
