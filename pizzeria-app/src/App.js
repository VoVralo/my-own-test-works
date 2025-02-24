// ======= МОДАЛЬНОЕ ОКНО "ABOUT US" =======
const openAbUs = document.getElementById("openModalAboutUs");
const closeAbUs = document.getElementById("closeModalAboutUs");
const modalAboutUs = document.getElementById("modalAboutUs");

openAbUs.addEventListener("click", () => {
    modalAboutUs.classList.add("open");
});

closeAbUs.addEventListener("click", () => {
    modalAboutUs.classList.remove("open");
});

modalAboutUs.addEventListener("click", (event) => {
    if (event.target === modalAboutUs) {
        modalAboutUs.classList.remove("open");
    }
});

// ======= МОДАЛЬНОЕ ОКНО "BUY PIZZA" =======
const modalPizzaBuy = document.getElementById("modalPizzaBuy");
const closeModalPizzaBuy = document.getElementById("closeModalPizzaBuy");
const modalPizzaContent = modalPizzaBuy.querySelector(".modal-inner div");

// ======= МОДАЛЬНОЕ ОКНО "КОРЗИНА" =======
const cartIcon = document.querySelector(".fa-cart-shopping");
const cartModal = document.createElement("div");
cartModal.classList.add("modal");
cartModal.innerHTML = `
    <div class="modal-inner">
        <h2>Your Cart</h2>
        <div id="cartItems"></div>
        <p><b>Total:</b> $<span id="cartTotal">0.00</span></p>
        <button id="closeCart">Close</button>
    </div>
`;
document.body.appendChild(cartModal);
const closeCartButton = cartModal.querySelector("#closeCart");

// ======= ДАННЫЕ О ПИЦЦАХ =======
const pizzaPrices = {
    "Margherita": 2.30,
    "Pepperoni": 3.00,
    "Four Cheese": 3.44,
    "Hawaiian": 2.19
};

// Корзина
const cart = [];

// ======= ФУНКЦИЯ ОТКРЫТИЯ ОКНА ПОКУПКИ ПИЦЦЫ =======
const openPizzaModal = (pizzaName, pizzaDescription, pizzaPrice) => {
    // Очищаем старое содержимое
    modalPizzaContent.innerHTML = `
        <h2>${pizzaName}</h2>
        <p>${pizzaDescription}</p>
        <p><b>Price:</b> $${pizzaPrice.toFixed(2)}</p>
    `;

    // Проверяем, есть ли уже кнопка "Add to Cart", если да — удаляем
    let existingButton = document.getElementById("addToCartButton");
    if (existingButton) {
        existingButton.remove();
    }

    // Создаём новую кнопку "Add to Cart"
    const addToCartButton = document.createElement("button");
    addToCartButton.id = "addToCartButton";
    addToCartButton.textContent = "Add to Cart";

    // Добавляем обработчик клика
    addToCartButton.addEventListener("click", () => {
        addToCart(pizzaName, pizzaPrice);
        modalPizzaBuy.classList.remove("open");
    });

    // Добавляем кнопку в окно
    modalPizzaContent.appendChild(addToCartButton);

    modalPizzaBuy.classList.add("open");
};

// ======= ОТКРЫТИЕ ОКНА ПОКУПКИ ПИЦЦЫ =======
document.querySelectorAll(".buyButton").forEach(button => {
    button.addEventListener("click", (event) => {
        const pizzaBox = event.target.closest("div");
        const pizzaName = pizzaBox.querySelector(".pizza-name").textContent.trim();
        const pizzaDescription = pizzaBox.querySelector("div:nth-child(3)").textContent.trim();
        const pizzaPrice = pizzaPrices[pizzaName] || 0;

        openPizzaModal(pizzaName, pizzaDescription, pizzaPrice);
    });
});

// ======= ФУНКЦИЯ ДОБАВЛЕНИЯ В КОРЗИНУ =======
const addToCart = (name, price) => {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCartIcon();
};

// ======= ОБНОВЛЕНИЕ КОРЗИНЫ В ИКОНКЕ =======
const updateCartIcon = () => {
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartIcon.setAttribute("data-count", totalItems);
    cartIcon.style.position = "relative";

    let cartCounter = document.querySelector(".cart-counter");
    if (!cartCounter) {
        cartCounter = document.createElement("span");
        cartCounter.classList.add("cart-counter");
        cartIcon.appendChild(cartCounter);
    }
    cartCounter.textContent = totalItems;
};

// ======= ОТКРЫТИЕ КОРЗИНЫ =======
cartIcon.addEventListener("click", () => {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.innerHTML = `
                <p><b>${item.name}</b> - $${item.price.toFixed(2)} x ${item.quantity}</p>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("cartTotal").textContent = cartTotal.toFixed(2);

    cartModal.classList.add("open");
});

// ======= ЗАКРЫТИЕ КОРЗИНЫ =======
closeCartButton.addEventListener("click", () => {
    cartModal.classList.remove("open");
});

// Закрытие по клику вне корзины
cartModal.addEventListener("click", (event) => {
    if (event.target === cartModal) {
        cartModal.classList.remove("open");
    }
});

// ======= ЗАКРЫТИЕ ОКНА ПОКУПКИ ПИЦЦЫ =======
closeModalPizzaBuy.addEventListener("click", () => {
    modalPizzaBuy.classList.remove("open");
});

modalPizzaBuy.addEventListener("click", (event) => {
    if (event.target === modalPizzaBuy) {
        modalPizzaBuy.classList.remove("open");
    }
});
