// register form elements
const Form = document.querySelector('.register__form');
const Username = document.querySelector('#register-username');
const Password = document.querySelector('#register-password');
const Email = document.querySelector('#register-email');
const RegisterBtn = document.querySelector('.register__btn');

// Toast 
const Toast = document.querySelector('.toast');

// Regex 
const Regex = {
    username: /^[a-zA-Z0-9]{3,20}$/,
    password: /^[a-zA-Z0-9]{6,20}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

// EventListner Input
Username.addEventListener('input', () => {
    if (Regex.username.test(Username.value)) {
        Username.style.border = '1px solid green';
    } else {
        Username.style.border = '1px solid red';
    }
})

Password.addEventListener('input', () => {
    if (Regex.password.test(Password.value)) {
        Password.style.border = '1px solid green';
    } else {
        Password.style.border = '1px solid red';
    }
})

Email.addEventListener('input', () => {
    if (Regex.email.test(Email.value)) {
        Email.style.border = '1px solid green';
    } else {
        Email.style.border = '1px solid red';
    }
})

// Register form submit event
Form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (Regex.username.test(Username.value) && Regex.password.test(Password.value) && Regex.email.test(Email.value)) {
        localStorage.setItem('register', JSON.stringify({user: Username.value, pass: Password.value, email: Email.value}));
        setTimeout(() => {
            Username.value = '';
            Password.value = '';
            Email.value = '';
            
            window.location.href = '/index.html';
        }, 1000)
    }
})