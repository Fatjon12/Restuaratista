const menuItems = {
    pasta: [
        {
            name: "Spaghetti Carbonara",
            price: 19.99,
            description: "Delicious Carbonara served with creamy carbonara sauce.",
            ingredients: ["Pasta", "Eggs", "Parmesan cheese"]
        },
        {
            name: "Penne Arrabiata",
            price: 11.99,
            description: "Penne Arrabiata cooked with spicy tomato sauce.",
            ingredients: ["Penne pasta", "Tomato Sauce", "Garlic", "Chilli flakes", "Minced cheese"]
        },
        {
            name: "Ravioli with Spinach",
            price: 12.99,
            description: "Ravioli with Spinach cooked with cottage cheese.",
            ingredients: ["Pasta", "Eggs", "Oil"]
        },
    ],
    pizza: [
        {
            name: "Margherita",
            price: 14.99,
            description: "Classic Margherita topped with tomato sauce.",
            ingredients: ["Dough", "Tomato sauce", "Mozzarella", "Basil"]
        },
        {
            name: "Pepperoni",
            price: 13.99,
            description: "Pepperoni Pizza topped with tomato sauce.",
            ingredients: ["Dough", "Tomato sauce", "Mozzarella", "Basil"]
        },
        {
            name: "Tuna",
            price: 10.99,
            description: "Tuna pizza topped with mozzarella cheese and fresh tuna.",
            ingredients: ["Dough", "Tomato sauce", "Mozzarella"]
        }
    ],
    desserts: [
        {
            name: "Tiramisu",
            price: 8.99,
            description: "Traditional Italian dessert with ladyfingers.",
            ingredients: ["Mascarpone", "Coffee", "Ladyfingers"]
        },
        {
            name: "Raffaelo Cake",
            price: 6.00,
            description: "Cake made with coconut, almond and white chocolate.",
            ingredients: ["Chocolate", "Milk", "Almond"]
        },
        {
            name: "Chocolate Lava Cake",
            price: 10.99,
            description: "Decadent chocolate cake with chocolate center.",
            ingredients: ["Chocolate", "Sugar", "Butter"]
        }
    ]
};

function updateMenuItems() {
    const menu = document.getElementById("Menu");
    const menuItemsList = document.getElementById("menu-items");

    menuItemsList.innerHTML = "";

    const menuValue = menu.value.toLowerCase();
    const items = menuItems[menuValue];

    items.forEach((item) => {
        const li = document.createElement("li");
        const name = document.createElement("span");
        const price = document.createElement("span");
        const description = document.createElement("p");
        const ingredients = document.createElement("p");
        const addButton = document.createElement("button");

        name.textContent = item.name;
        price.textContent = `$${item.price.toFixed(2)}`;
        description.textContent = `Description: ${item.description}`;
        ingredients.textContent = `Ingredients: ${item.ingredients.join(", ")}`;
        addButton.textContent = "+";
        addButton.setAttribute("data-name", item.name);
        addButton.setAttribute("data-price", item.price.toFixed(2));

        addButton.addEventListener("click", addToBasket);

        li.appendChild(name);
        li.appendChild(price);
        li.appendChild(description);
        li.appendChild(ingredients);
        li.appendChild(addButton);

        menuItemsList.appendChild(li);
    });

    applySearchFunctionality();
}

function applySearchFunctionality() {
    const menuItemsList = document.getElementById("menu-items");
    const menuItems = menuItemsList.getElementsByTagName("li");
    const searchInput = document.getElementById("search");

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase();

        Array.from(menuItems).forEach((item) => {
            const itemName = item.querySelector("span").textContent.toLowerCase();

            if (itemName.includes(searchText)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
}

function addToBasket(event) {
    const itemName = event.target.getAttribute("data-name");
    const itemPrice = parseFloat(event.target.getAttribute("data-price"));
    const basketList = document.getElementById("basket-items");
    const li = document.createElement("li");
    const name = document.createElement("span");
    const price = document.createElement("span");
    const removeButton = document.createElement("button");
    const addButton = document.createElement("button");
    name.textContent = itemName;
    price.textContent = `$${itemPrice.toFixed(2)}`;
    removeButton.textContent = "-";
    addButton.textContent = "+";
    removeButton.classList.add("remove");
    addButton.classList.add("add");
    addButton.setAttribute("data-name", itemName);
    addButton.setAttribute("data-price", itemPrice.toFixed(2));
    removeButton.addEventListener("click", removeFromBasket);
    addButton.addEventListener("click", addToBasket);
    li.appendChild(name);
    li.appendChild(price);
    li.appendChild(removeButton);
    li.appendChild(addButton);
    basketList.appendChild(li);
    calculateTotal();
    checkMinimumOrder();
}

function removeFromBasket(event) {
    event.target.parentElement.remove();
    calculateTotal();
    checkMinimumOrder();
}

function calculateTotal() {
    const basketItems = document.querySelectorAll("#basket-items li");
    let subtotal = 0;
    let tax = 0;
    let total = 0;
    const taxRate = 0.18; // 18%
    basketItems.forEach((item) => {
        const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(1));
        subtotal += itemPrice;
    });
    tax = subtotal * taxRate;
    total = subtotal + tax;
    document.querySelector("#subtotal-price").textContent = `${subtotal.toFixed(2)}`;
    document.querySelector("#tax-price").textContent = `${tax.toFixed(2)}`;
    document.querySelector("#total-price").textContent = `${total.toFixed(2)}`;
}

function checkMinimumOrder() {
    const basketItems = document.querySelectorAll("#basket-items li");
    let subtotal = 0;
    basketItems.forEach((item) => {
        const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(1));
        subtotal += itemPrice;
    });
    const minimumOrderValue = 20.0;
    const basketMessage = document.getElementById("basket-message");
    if (subtotal < minimumOrderValue) {
        basketMessage.style.display = "block";
    } else {
        basketMessage.style.display = "none";
    }
}

document.getElementById("Menu").addEventListener("change", updateMenuItems);
updateMenuItems();


// function updateMenuItems() {
//     const menu = document.getElementById("Menu");
//     const menuItemsList = document.getElementById("menu-items");

//     menuItemsList.innerHTML = "";

//     const menuValue = menu.value;
//     const items = menuItems[menuValue];

//     items.forEach((item) => {
//         const li = document.createElement("li");
//         li.innerHTML = `
//             <span>${item.name}</span>
//             <span>$${item.price.toFixed(2)}</span>
//             <p>Description: ${item.description}</p>
//             <p>Ingredients: ${item.ingredients.join(", ")}</p>
//             <button data-name="${item.name}" data-price="${item.price.toFixed(2)}">+</button>
//         `;

//         const addButton = li.querySelector("button");
//         addButton.addEventListener("click", addToBasket);

//         menuItemsList.appendChild(li);
//     });

//     applySearchFunctionality();
// }

// function applySearchFunctionality() {
//     const menuItemsList = document.getElementById("menu-items");
//     const searchInput = document.getElementById("search");

//     searchInput.addEventListener("input", function () {
//         const searchText = searchInput.value.toLowerCase();
//         const items = menuItemsList.getElementsByTagName("li");

//         Array.from(items).forEach((item) => {
//             const itemName = item.querySelector("span").textContent.toLowerCase();
//             item.style.display = itemName.includes(searchText) ? "block" : "none";
//         });
//     });
// }

// function addToBasket(event) {
//     // Functionality to add the item to the basket
//     const itemName = event.target.getAttribute("data-name");
//     const itemPrice = event.target.getAttribute("data-price");

//     console.log(`Added ${itemName} to the basket at price $${itemPrice}`);
// }

// // Event listener for menu change
// document.getElementById("Menu").addEventListener("change", updateMenuItems);