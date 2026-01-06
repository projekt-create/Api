// API 
const PRODUCTS_API = "https://fakestoreapi.com/products";
const USERS_API = "https://fakestoreapi.com/users";
const CARTS_API = "https://fakestoreapi.com/carts";

// CACHES
let PRODUCTS_CACHE = [];

// DOM 
const ProfileInfoCards = document.querySelector(".section__right__bottom");
const createBtn = document.querySelector(".create__card");
const modal = document.getElementById("productModal");
const modalClose = document.querySelector(".modal-close");
const productForm = document.getElementById("productForm");
const modalTitle = document.getElementById("modalTitle");
const submitBtn = document.getElementById("submitBtn");
const productIdInput = document.getElementById("productId");

const Home = document.querySelector(".section__button-home");
const UserBtn = document.querySelector(".section__button-user");
const CartsBtn = document.querySelector(".section__button-carts");
const Logout = document.querySelector(".section__button-logout");
const Profile = document.querySelector(".section__button-profile");
const cartModal = document.getElementById("cartModal");
const cartModalClose = document.getElementById("cartModalClose");
const cartModalProducts = document.querySelector(".cartmodal__products");


// HELPERS 
function clearCards() {
    ProfileInfoCards.innerHTML = "";
}

function showLoading(text) {
    ProfileInfoCards.innerHTML = `<p class="loading">${text}</p>`;
}

function showError(text) {
    ProfileInfoCards.innerHTML = `<p class="error">${text}</p>`;
}

// PRODUCTS 
async function loadProducts() {
    showLoading("Loading products...");
    try {
        const res = await fetch(PRODUCTS_API);
        const data = await res.json();
        showProducts(data);
        PRODUCTS_CACHE = data;
    } catch {
        showError("Error loading products");
    }
}

function showProducts(data) {
    clearCards();
    data.forEach(product => createProductCard(product));
    attachProductEvents();
}

function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="card__img">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="card__info">
            <p class="card__info-title">${product.title}</p>
            <p class="card__info-category">${product.category}</p>
            <p class="card__info-description">${product.description}</p>
            <p class="card__info-price">$${product.price}</p>
        </div>
        <div class="card__actions">
            <button class="edit-btn" data-id="${product.id}">Edit</button>
            <button class="delete-btn" data-id="${product.id}">Delete</button>
        </div>
    `;
    ProfileInfoCards.appendChild(card);
}

function attachProductEvents() {
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.onclick = () => openEditModal(btn.dataset.id);
    });
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.onclick = () => deleteProduct(btn.dataset.id);
    });
}

// USERS 
async function loadUsers() {
    showLoading("Loading users...");
    try {
        const res = await fetch(USERS_API);
        const users = await res.json();
        showUsers(users);
    } catch {
        showError("Error loading users");
    }
}

function showUsers(users) {
    clearCards();
    users.forEach(user => {
        const card = document.createElement("div");
        card.className = "card user-card";
        card.innerHTML = `
            <div class="card__info">
                <p><b>ID:</b> ${user.id}</p>
                <p><b>Name:</b> ${user.name.firstname} ${user.name.lastname}</p>
                <p><b>Username:</b> ${user.username}</p>
                <p><b>Email:</b> ${user.email}</p>
                <p><b>Phone:</b> ${user.phone}</p>
            </div>
        `;
        ProfileInfoCards.appendChild(card);
    });
}

// CARTS
async function loadCarts() {
    showLoading("Loading carts...");
    try {
        const res = await fetch(CARTS_API);
        const carts = await res.json();
        showCarts(carts);
    } catch {
        showError("Error loading carts");
    }
}

function showCarts(carts) {
    clearCards();

    carts.forEach(cart => {
        const card = document.createElement("div");
        card.className = "card cart-card";

        card.innerHTML = `
            <div class="card__info">
                <p><b>Cart ID:</b> ${cart.id}</p>
                <p><b>User ID:</b> ${cart.userId}</p>
                <p><b>Date:</b> ${cart.date}</p>

                <button class="cart-view-btn">View</button>
            </div>
        `;

        ProfileInfoCards.appendChild(card);

        card.querySelector(".cart-view-btn").addEventListener("click", () => {
            openCartModal(cart);
        });
    });
}

function openCartModal(cart) {
    cartModalProducts.innerHTML = "";

    cart.products.forEach(item => {
        const product = PRODUCTS_CACHE.find(p => p.id === item.productId);
        if (!product) return;

        cartModalProducts.innerHTML += `
            <div class="cartmodal__product">
                <img src="${product.image}" alt="${product.title}">
                <div class="cartmodal__product-info">
                    <p class="title">${product.title}</p>
                    <p class="price">$${product.price}</p>
                    <p class="qty">Quantity: ${item.quantity}</p>
                </div>
            </div>
        `;
    });

    cartModal.style.display = "flex";
}

cartModalClose.onclick = () => {
    cartModal.style.display = "none";
};

window.addEventListener("click", e => {
    if (e.target === cartModal) {
        cartModal.style.display = "none";
    }
});



// MODAL 
createBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    modalTitle.textContent = "Create Product";
    productForm.reset();
    productIdInput.value = "";
});

modalClose.onclick = () => modal.style.display = "none";

productForm.addEventListener("submit", async e => {
    e.preventDefault();

    const product = {
        title: title.value,
        price: +price.value,
        description: description.value,
        category: category.value,
        image: image.value
    };

    if (productIdInput.value) {
        await fetch(`${PRODUCTS_API}/${productIdInput.value}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
    } else {
        await fetch(PRODUCTS_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
    }

    modal.style.display = "none";
    loadProducts();
});

// EDIT / DELETE 
async function openEditModal(id) {
    const res = await fetch(`${PRODUCTS_API}/${id}`);
    const p = await res.json();

    modal.style.display = "flex";
    modalTitle.textContent = "Edit Product";

    productIdInput.value = p.id;
    title.value = p.title;
    price.value = p.price;
    description.value = p.description;
    category.value = p.category;
    image.value = p.image;
}

async function deleteProduct(id) {
    if (!confirm("Delete product?")) return;
    await fetch(`${PRODUCTS_API}/${id}`, { method: "DELETE" });
    loadProducts();
}

// NAV 
Home.onclick = loadProducts;
UserBtn.onclick = loadUsers;
CartsBtn.onclick = loadCarts;

Logout.onclick = () => {
    localStorage.clear();
    location.href = "../index.html";
};

// SEARCH (Products only) 
document.getElementById("Search").addEventListener("input", e => {
    const val = e.target.value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(val)
            ? "flex"
            : "none";
    });
});

// INIT 
loadProducts();
