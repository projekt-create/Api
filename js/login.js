// Login form elements
const Form = document.querySelector('.login__form');
const Username = document.querySelector('#login-username');
const Password = document.querySelector('#login-password');
const LoginBtn = document.querySelector('.login__btn');

// Toast 
const Toast = document.querySelector('.toast');

// Accaunt check
let registercheck = JSON.parse(localStorage.getItem('register'));

// Login form submit event
Form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (Username.value == 'admin' && Password.value == 'admin') {
        localStorage.setItem('login', JSON.stringify({user: 'admin', pass: 'admin'}));
        Username.value = '';
        Password.value = '';
        Toast.style.display = 'flex';
            Toast.style.opacity = '0';
            Toast.style.background = 'green';
            Toast.style.transition = 'all .5s ease';
            Toast.innerHTML = 'Login success';

            setTimeout(() => {
                Toast.style.opacity = '1';
                Toast.style.transition = 'all .5s ease';
            }, 300);

            setTimeout(() => {
                Toast.style.opacity = '0';
                Toast.style.transition = 'all .3s ease';
                setTimeout(() => {
                    Toast.style.display = 'none';
                }, 600);
            }, 2000)
        setTimeout(() => {
            window.location.href = '/page/admin.html'
        }, 1000)
    } else if (registercheck != null){
        if(Username.value.trim() == registercheck.user.trim() && Password.value == registercheck.pass) {
            localStorage.setItem('login', JSON.stringify({user: registercheck.username, pass: registercheck.password}));
            Username.style.border = '1px solid green';
            Password.style.border = '1px solid green';
            Username.value = '';
            Password.value = '';
            
            Toast.style.display = 'flex';
            Toast.style.opacity = '0';
            Toast.style.background = 'green';
            Toast.style.transition = 'all .5s ease';
            Toast.innerHTML = 'Login success';

            setTimeout(() => {
                Toast.style.opacity = '1';
                Toast.style.transition = 'all .5s ease';
            }, 300);

            setTimeout(() => {
                Toast.style.opacity = '0';
                Toast.style.transition = 'all .3s ease';
                setTimeout(() => {
                    Toast.style.display = 'none';
                }, 600);
            }, 2000)
            setTimeout(() => {
                window.location.href = '/page/home.html'
            }, 1000)
        }
    }else {
        Username.style.transform = 'translateX(-5px)';
        Password.style.transform = 'translateX(-5px)';
        Username.style.transition = 'all 0.1s ease';
        Password.style.transition = 'all 0.1s ease';
        Username.style.border = '1px solid red';
        Password.style.border = '1px solid red';
        Toast.style.display = 'flex';
        Toast.style.opacity = '0';
        Toast.style.background = 'red';
        Toast.style.transition = 'all .5s ease';
        Toast.innerHTML = 'User not found';

        setTimeout(() => {
            Username.style.transform = 'translateX(5px)';
            Password.style.transform = 'translateX(5px)';

            Toast.style.opacity = '1';
            Toast.style.transition = 'all .5s ease';
        }, 300);

        setTimeout(() => {
            Username.style.transform = 'translateX(0px)';
            Password.style.transform = 'translateX(0px)';
            Username.style.transition = 'all .3s ease';
            Password.style.transition = 'all .3s ease';

        }, 600);

        setTimeout(() => {
            Toast.style.opacity = '0';
            Toast.style.transition = 'all .3s ease';
            setTimeout(() => {
                Toast.style.display = 'none';
            }, 600);
        }, 2000)
    }
});
