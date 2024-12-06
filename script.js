
//fetch pizza information on openning details
const pizzasDetails = document.getElementById('pizzas-details');
pizzasDetails.addEventListener("toggle", () => {
    if (pizzasDetails.hasAttribute("open"))
        fetchPizzas(null);
});

const pizzaBtnSearch = document.getElementById('btn-pizza-search');
const pizzaSearchInput = document.getElementById('search-pizza');
pizzaBtnSearch.addEventListener('click', () => {
    console.log(pizzaSearchInput.value);
    fetchPizzas(pizzaSearchInput.value);
});

const pizzaBtnFilter = document.getElementById('btn-pizza-filter');
const pizzaVegTypeCheckbox = document.getElementById('veg-type-checkbox');
const pizzaMinPriceInput = document.getElementById('pizza-min-price');

pizzaBtnFilter.addEventListener('click', () => {
    let isVeg = pizzaVegTypeCheckbox.checked;
    let minPrice = pizzaMinPriceInput.value
    console.log(isVeg);
    console.log(minPrice);
    fetchPizzas(null, { isVeg, minPrice });
});

// Fetch and display all pizzas
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

        console.log(pizzaName);
        if (pizzaName != null) {
            const searchedPizzas = pizzas.filter(pizza => pizza.name.includes(pizzaName));
            displayPizzas(searchedPizzas);
        }
        if (filterOption != null) {
            const filteredPizzas = pizzas.filter(pizza => pizza.veg == filterOption.isVeg && pizza.price >= filterOption.minPrice)
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
        pizzaCard.classList.add("pizza-card");

        //create pizza image 
        const pizzaImage = document.createElement('img');
        pizzaImage.setAttribute('src', pizza.img);
        pizzaImage.setAttribute('alt', pizza.name);
        pizzaImage.style.width = "100%";
        pizzaImage.style.height = "auto";


        //create pizza name
        const pizzaNameDiv = document.createElement('div');
        pizzaNameDiv.classList.add('pizza-name');
        pizzaNameDiv.innerText = pizza.name;


        //create pizza information
        const pizzaInfoDiv = document.createElement('div');
        pizzaInfoDiv.classList.add('pizza-info');

        //create pizza description paragraph
        const pizzaDescription = document.createElement('p');
        pizzaDescription.classList.add('pizza-description');
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

function displayPizza(pizza) {
    const pizzasContainer = document.getElementById('pizzas-container');
    pizzasContainer.innerHTML = "";

    //create pizza card element
    const pizzaCard = document.createElement('div');
    pizzaCard.classList.add("pizza-card");

    //create pizza image 
    const pizzaImage = document.createElement('img');
    pizzaImage.setAttribute('src', pizza.img);
    pizzaImage.setAttribute('alt', pizza.name);
    pizzaImage.style.width = "100%";
    pizzaImage.style.height = "auto";


    //create pizza name
    const pizzaNameDiv = document.createElement('div');
    pizzaNameDiv.classList.add('pizza-name');
    pizzaNameDiv.innerText = pizza.name;


    //create pizza information
    const pizzaInfoDiv = document.createElement('div');
    pizzaInfoDiv.classList.add('pizza-info');

    //create pizza description paragraph
    const pizzaDescription = document.createElement('p');
    pizzaDescription.classList.add('pizza-description');
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
}
