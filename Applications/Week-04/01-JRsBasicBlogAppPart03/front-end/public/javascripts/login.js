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
            const expireDate = new Date(Date.now() + 86400000);
            console.log(`Setting cookie for expiration ${expireDate}`)
            document.cookie = `username=${data.data.username}; expires=${expireDate}`;
            document.location.href = '/users/welcome?name=' + data.data.username;
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