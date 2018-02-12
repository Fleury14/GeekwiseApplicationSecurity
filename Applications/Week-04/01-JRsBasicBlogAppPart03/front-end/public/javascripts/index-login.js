function loginButtonCheck() {
    console.log('Checking for cookie to see if button needs to be disables...');
    const cookieUserName = MyBlogApp.getCookie('realusername');
    document.querySelector('.login-direct').disabled = cookieUserName ? true : false;
}

loginButtonCheck();