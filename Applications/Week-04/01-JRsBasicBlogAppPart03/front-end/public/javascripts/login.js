// event handler for login action
MyBlogApp.loginHandler = function(e) {
    e.preventDefault();
    console.log(e);
    let email = MyBlogApp.getFormInput(e, 'email');
    let password = MyBlogApp.getFormInput(e, 'password');
    MyBlogApp.spin();
    MyBlogApp.request('POST', '/user/login', { email: email, password: password }, (status, data) => {
        console.log(status, data);
        MyBlogApp.spinStop();
        if (status === 200) {
            MyBlogApp.login(data.data.username);
            document.location.href = '/users/welcome?name=' + data.data.username;
            MyBlogApp.setCookie('jwt', data.data.jwtToken, 1);
            window.localStorage.setItem('jwt', data.data.jwtToken)
            // console.log('DAAAAAAATA', data);
        } else if (status === 404) {
            MyBlogApp.toast('danger', data.message);
        }
    });
}


// setup the event handler
window.onload = function() {
    MyBlogApp.loginCheck();
    document.querySelector("form#login-form").addEventListener('submit', MyBlogApp.loginHandler);
}