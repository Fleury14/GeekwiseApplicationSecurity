// server address
let _baseUrl = "http://localhost";
let _port = "3000";

function loginButtonCheck() {
    console.log('Checking for cookie to see if button needs to be disables...');
    const cookieUserName = MyBlogApp.getCookie('realusername');
    document.querySelector('.login-direct').disabled = cookieUserName ? true : false;
    document.querySelector('.new-post-button').disabled = !cookieUserName ? true : false;
}

MyBlogApp.toggleForm = function() {
    // console.log('toggling form...');
    const form = document.getElementById('addBlogForm');
    form.classList.toggle('hide-form');
}

loginButtonCheck();