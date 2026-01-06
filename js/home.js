// fetch api 
const Api = 'https://dummyjson.com/products';

// Main
const Main = document.querySelector('.main__cards');
const Loading = document.querySelector('#loading');

// Header
const Box = document.querySelector('.header__box');
const Baskets = document.querySelector('.header__cart');
const Logo = document.querySelector('.header__logo');
const BasketsCountNumber = document.querySelector('#cart-count');

// Search
const Search = document.querySelector('.header__input');

// logout
const Logout = document.querySelector('#logout');
Logout.addEventListener('click', () => {
    localStorage.clear();
    Box.style.display = 'flex';
    Baskets.style.display = 'none';
    Search.style.display = 'none';
    Logout.style.display = 'none';
});


// Pagination
const First = document.querySelector('#first');
const Second = document.querySelector('#second');
const Third = document.querySelector('#third');

// check login or register status
if (localStorage.getItem('login') != null) {
    Box.style.display = 'none';
    Baskets.style.display = 'flex';
    Search.style.display = 'flex';
    Logout.style.display = 'flex';
} else if (localStorage.getItem('register') != null) {
    Box.style.display = 'none';
    Baskets.style.display = 'flex';
    Search.style.display = 'flex';
    Logout.style.display = 'flex';
} else {
    Box.style.display = 'flex';
    Baskets.style.display = 'none';
    Search.style.display = 'none';
    Logout.style.display = 'none';
}

if (localStorage.getItem('Baskets') != null) {
    BasketsCountNumber.innerHTML = localStorage.getItem('Baskets');
    BasketsCountNumber.style.display = 'flex';
}

// fetch
fetch(Api)
    .then(response => response.json())
    .then(data => Showdata(data.products));

function Showdata(data) {
    let id = localStorage.getItem('id');
    // check deleted cards
    data.forEach(element => {
        
    })

    // pagination check
    if (localStorage.getItem('pagination') == 1) {
        Main.innerHTML = '';
            for (let i = 0; i < 12; i++) {
                Main.innerHTML += `
                    <div class="card">
                        <div class="card__img">
                            <img src="${data[i].images[0]}" alt="card">
                        </div>
                        <div class="card__text">
                            <h2>${data[i].title}</h2>
                            <p>${data[i].description}</p>
                            <p><b>Category:</b> ${data[i].category}</p>
                            <p><b>Price:</b> ${data[i].price}</p>
                        </div>
                        <div class="card__btn">
                            <button class="card__btn-add" data-id="${data[i].id}">Viwe more</button>
                        </div>  
                    </div>
                `
            };
    } else if (localStorage.getItem('pagination') == 2) {
            Main.innerHTML = '';
            for (let i = 12; i < 24; i++) {
                Main.innerHTML += `
                    <div class="card">
                        <div class="card__img">
                            <img src="${data[i].images[0]}" alt="card">
                        </div>
                        <div class="card__text">
                            <h2>${data[i].title}</h2>
                            <p>${data[i].description}</p>
                            <p><b>Category:</b> ${data[i].category}</p>
                            <p><b>Price:</b> ${data[i].price}</p>
                        </div>
                        <div class="card__btn">
                            <button class="card__btn-add" data-id="${data[i].id}">Viwe more</button>
                        </div>  
                    </div>
                `
            };
    } else if (localStorage.getItem('pagination') == 3) {
            Main.innerHTML = '';
            for (let i = 24; i < 30; i++) {
                Main.innerHTML += `
                    <div class="card">
                        <div class="card__img">
                            <img src="${data[i].images[0]}" alt="card">
                        </div>
                        <div class="card__text">
                            <h2>${data[i].title}</h2>
                            <p>${data[i].description}</p>
                            <p><b>Category:</b> ${data[i].category}</p>
                            <p><b>Price:</b> ${data[i].price}</p>
                        </div>  
                        <div class="card__btn">
                            <button class="card__btn-add" data-id="${data[i].id}">Viwe more</button>
                        </div>
                    </div>
                `
            };
    }else{
        for (let i = 0; i < 12; i++) {
        Main.innerHTML += `
            <div class="card">
                <div class="card__img">
                    <img src="${data[i].images[0]}" alt="card">
                </div>
                <div class="card__text">
                    <h2>${data[i].title}</h2>
                    <p>${data[i].description}</p>
                    <p><b>Category:</b> ${data[i].category}</p>
                    <p><b>Price:</b> ${data[i].price}</p>
                </div>
                <div class="card__btn">
                    <button class="card__btn-add" data-id="${data[i].id}">Viwe more</button>
                </div>  
            </div>
        `
    };
    }

    // Pagination
    First.addEventListener('click', () => {
        Main.innerHTML = '';
        for (let i = 0; i < 12; i++) {
            Main.innerHTML += `
                <div class="card">
                    <div class="card__img">
                        <img src="${data[i].images[0]}" alt="card">
                    </div>
                    <div class="card__text">
                        <h2>${data[i].title}</h2>
                        <p>${data[i].description}</p>
                        <p><b>Category:</b> ${data[i].category}</p>
                        <p><b>Price:</b> ${data[i].price}</p>
                    </div>
                    <div class="card__btn">
                        <button class="card__btn-add" data-id="${data[i].id}">Viwe more</button>
                    </div>  
                </div>
            `
        };
        localStorage.setItem('pagination', 1);
        location.reload();
    });
    Second.addEventListener('click', () => {
        Main.innerHTML = '';
        for (let i = 12; i < 24; i++) {
            Main.innerHTML += `
                <div class="card">
                    <div class="card__img">
                        <img src="${data[i].images[0]}" alt="card">
                    </div>
                    <div class="card__text">
                        <h2>${data[i].title}</h2>
                        <p>${data[i].description}</p>
                        <p><b>Category:</b> ${data[i].category}</p>
                        <p><b>Price:</b> ${data[i].price}</p>
                    </div>
                    <div class="card__btn">
                        <button class="card__btn-add" data-id="${data[i].id}">Viwe more</button>
                    </div>  
                </div>
            `
        };
        localStorage.setItem('pagination', 2);
        location.reload();

    });
    Third.addEventListener('click', () => {
        Main.innerHTML = '';
        for (let i = 24; i < 30; i++) {
            Main.innerHTML += `
                <div class="card">
                    <div class="card__img">
                        <img src="${data[i].images[0]}" alt="card">
                    </div>
                    <div class="card__text">
                        <h2>${data[i].title}</h2>
                        <p>${data[i].description}</p>
                        <p><b>Category:</b> ${data[i].category}</p>
                        <p><b>Price:</b> ${data[i].price}</p>
                    </div>
                    <div class="card__btn">
                        <button class="card__btn-add" data-id="${data[i].id}">Viwe more</button>
                    </div>  
                </div>
            `
        };
        localStorage.setItem('pagination', 3);
        location.reload();
    });

    // Loading hide
    Loading.style.display = 'none';

    // Viwe more
    const ViweMore = document.querySelectorAll('.card__btn-add');
    ViweMore.forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.setItem('id', btn.dataset.id);
            location.href = '/page/cart.html';
        });
    });

    // Search
    Search.addEventListener('input', () => {
        let value = Search.value.toLowerCase().trim();
        let cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            let title = card.querySelector('h2').textContent.toLowerCase();
            if (title.includes(value)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Adimn pahel link
let logincheck = JSON.parse(localStorage.getItem('login'));

if (logincheck != null ){
    if (logincheck.user == 'admin' && logincheck.pass == 'admin') {
        Logo.addEventListener('click', () => {
            Logo.href = '/page/admin.html';
        });
    }
}

