// fetch api 
const Api = 'https://dummyjson.com/products';

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

// Adimn pahel link
let logincheck = JSON.parse(localStorage.getItem('login'));

if (logincheck != null ){
    if (logincheck.user == 'admin' && logincheck.pass == 'admin') {
        Logo.addEventListener('click', () => {
            Logo.href = '/page/admin.html';
        });
    }
}

