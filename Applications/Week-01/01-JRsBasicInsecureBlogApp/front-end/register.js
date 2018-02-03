// server address
let _baseUrl = "http://localhost";
let _port = "3000";

function registerUser(event) {
    event.preventDefault();
    let password = $('#inputPassword1').val();
    let passwordVerify = $('#inputPassword2').val();
    let username = $('#inputUsername').val();
    console.log(password, passwordVerify);

    // make sure passwords match. if not, display error and stop function
    if (password !== passwordVerify) {
        console.log('Passwords dont match');
        document.getElementById('errorText').innerHTML = "<h3>Passwords must match</h3>";
        return;
    }

    // run api test to make sure username isnt surrently in the system
    jQuery.get(`${_baseUrl}:${_port}/api/user/usernamecheck/${username}`, {}, function(result) {
        console.log(result.data);
        if(result.data.notFound === true) {
            // username wasnt found, add user
            console.log('user not found, we good to go');
        } else {
            // display error message if username exists
            document.getElementById('errorText').innerHTML = "<h3>Username already exists!</h3>";    
        }
    });
}

// run on load 
$(function() {
    // server is running from same IP as front-end so get the hostname
    _baseUrl = `http://${window.location.hostname}`;
});
