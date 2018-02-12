// server address
let _baseUrl = "http://localhost";
let _port = "3000";
let _loggedInUser = '';

function getCars() {
    let blogContainer = document.getElementById('blog-list');
    console.log('Getting..');
    blogContainer.innerHTML = '';
    // let list = document.getElementById("car-list");
    // list.innerHTML = "";
    jQuery.get(`${_baseUrl}:3000/api/car`, function(data) {
        data.data.forEach((blogpost) => {
            // var newElement = document.createElement("li");
            // let edit = `<a href='#' data-carid='${car.id}' data-carmake='${car.make}' data-carmodel='${car.model}' onclick='editCar(event)'>edit</a>`;
            // let del = `<a href='#' data-carid='${car.id}' onclick='delCar(event)'>delete</a>`;
            
            // newElement.innerHTML = `${car.id} Make: ${car.make} Model: ${car.model} ${edit} | ${del}`;
            // list.appendChild(newElement);

            // let cleanAuthor = '';
            // let cleanContent = '';
            // $.post(`${_baseUrl}:3000/api/html`, {htmlData: blogpost.author}, function(newAuthor){
            //     cleanAuthor = newAuthor.data;
            // }).done(function() {
            //     $.post(`${_baseUrl}:3000/api/html`, {htmlData: blogpost.content}, function(newContent){
            //         cleanContent = newContent.data;
            //         let postDate = formatDate(new Date(blogpost.created_at));
            //         let newBlogItem = document.createElement('div');
            //         let author = `<h4>Posted by ${cleanAuthor}</h4>`;
            //         let body = `<p>${cleanContent}</p>`;
            //         let date = `<p>${postDate} - ${blogpost.id}</p>`;
            //         let buttonRow = `<div class="blog-item-button-row">
            //         <a href="#" data-blogid="${blogpost.id}" onclick="delCar(event)" class="btn btn-danger">Delete Post</a>
            //         <a href="#" data-blogid="${blogpost.id}" data-blogauthor="${blogpost.author}" data-blogcontent="${blogpost.content}" onclick="editCar(event)" class="btn btn-success">Edit Post</a>
            //         </div>`;
            //         newBlogItem.innerHTML = author + body + date + buttonRow;
            //         newBlogItem.classList.add('blog-item');
            //         blogContainer.appendChild(newBlogItem);
            //     })
            // })

            let postDate = formatDate(new Date(blogpost.created_at));
            let newBlogItem = document.createElement('div');
            let author = `<h4>Posted by ${blogpost.author}</h4>`;
            let body = `<p>${blogpost.content}</p>`;
            let date = `<p>${postDate} - ${blogpost.id}</p>`;
            let buttonRow = `<div class="blog-item-button-row">
            <a href="#" data-blogid="${blogpost.id}" onclick="delCar(event)" class="btn btn-danger">Delete Post</a>
            <span class="text-center">${blogpost.id}</span>
            <a href="#" data-blogid="${blogpost.id}" data-blogauthor="${blogpost.author}" data-blogcontent="${blogpost.content}" onclick="editCar(event)" class="btn btn-success">Edit Post</a>
            </div>`;
            let unsafe = author + body + date + buttonRow;
            
            newBlogItem.innerHTML = author + body + date + buttonRow;
            newBlogItem.classList.add('blog-item');
            blogContainer.appendChild(newBlogItem);

        });
    });
}

function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

function addCar(e) {
    e.preventDefault();
    let author = $("#author");
    let content = $("#content");
    let blogid = $("#blogid");

    let authorVal = author.val();
    let contentVal = content.val();

    if(authorVal == "" || contentVal == "") {
        alert('Author and Content cannot be blank');
        return;
    }

    if (+blogid.val() === 0) {
        jQuery.post(`${_baseUrl}:${_port}/api/car`, { author: authorVal, content: contentVal }, function(data) {
            getCars();
        });
    } else {
        $.ajax({
                method: "PUT",
                url: `${_baseUrl}:${_port}/api/car/${blogid.val()}`,
                data: { author: author.val(), content: content.val() }
            })
            .done(function(msg) {
                getCars();
            });
    }

    blogid.val(0);
    $("#blog-submit").val('Add Car');
    author.val("");
    content.val("");
    toggleForm();
}

function searchCars(e) {
    e.preventDefault();
    let order = $('#orderType').val();
    console.log('search');
    let list = document.getElementById("blog-list");
    list.innerHTML = "";
    let searchVal = $('#search').val();
    console.log(searchVal, order)
    $('#search').val("");

    jQuery.post(`${_baseUrl}:${_port}/api/car/search`, { search: searchVal, order: order }, function(data) {
        // console.log(data);
        data.data.forEach((blogpost) => {
            // var newElement = document.createElement("li");
            // let edit = `<a href='#' data-carid='${car.id}' data-carmake='${car.make}' data-carmodel='${car.model}' onclick='editCar(event)'>edit</a>`;
            // let del = `<a href='#' data-carid='${car.id}' onclick='delCar(event)'>delete</a>`;
            // newElement.innerHTML = `${car.id} Make: ${car.make} Model: ${car.model} ${edit} | ${del}`;
            // list.appendChild(newElement);
            let cleanAuthor = '';
            let cleanContent = '';
            $.post(`${_baseUrl}:3000/api/html`, {htmlData: blogpost.author}, function(newAuthor){
                cleanAuthor = newAuthor.data;
            }).done(function() {
                $.post(`${_baseUrl}:3000/api/html`, {htmlData: blogpost.content}, function(newContent){
                    cleanContent = newContent.data;
                    let postDate = formatDate(new Date(blogpost.created_at));
                    let newBlogItem = document.createElement('div');
                    let author = `<h4>Posted by ${cleanAuthor}</h4>`;
                    let body = `<p>${cleanContent}</p>`;
                    let date = `<p>${postDate} - ${blogpost.id}</p>`;
                    let buttonRow = `<div class="blog-item-button-row">
                    <a href="#" data-blogid="${blogpost.id}" onclick="delCar(event)" class="btn btn-danger">Delete Post</a>
                    <a href="#" data-blogid="${blogpost.id}" data-blogauthor="${blogpost.author}" data-blogcontent="${blogpost.content}" onclick="editCar(event)" class="btn btn-success">Edit Post</a>
                    </div>`;
                    newBlogItem.innerHTML = author + body + date + buttonRow;
                    newBlogItem.classList.add('blog-item');
                    list.appendChild(newBlogItem);
                })
            })
            // let postDate = formatDate(new Date(blogpost.created_at));
            // let newBlogItem = document.createElement('div');
            // let author = `<h4>Posted by ${blogpost.author}</h4>`;
            // let body = `<p>${blogpost.content}</p>`;
            // let date = `<p>${postDate}</p>`;
            // let buttonRow = `<div class="blog-item-button-row">
            // <a href="#" data-blogid="${blogpost.id}" onclick="delCar(event)" class="btn btn-danger">Delete Post</a>
            // <a href="#" data-blogid="${blogpost.id}" data-blogauthor="${blogpost.author}" data-blogcontent="${blogpost.content}" onclick="editCar(event)" class="btn btn-success">Edit Post</a>
            // </div>`;
            // newBlogItem.innerHTML = author + body + date + buttonRow;
            // let unsafe = author + body + date + buttonRow;
            // $.post(`${_baseUrl}:3000/api/html`, {htmlData: unsafe}, function(newHTML) {
            //     // console.log('calling html parse API');
            //     // console.log('recieved', newHTML.data);
            //     newBlogItem.innerHTML = newHTML.data;
            //     newBlogItem.classList.add('blog-item');
            //     list.appendChild(newBlogItem);
            // });
            // newBlogItem.classList.add('blog-item');
            // list.appendChild(newBlogItem);
        });
    });
}

function editCar(e) {
    e.preventDefault();
    let el = $(e.srcElement);
    let author = $("#author");
    let content = $("#content");
    let id = $("#blogid");
    

    let authorVal = el.data("blogauthor");
    let contentVal = el.data("blogcontent");
    let idVal = el.data("blogid");

    $("#blog-submit").val(`Edit Blog #${idVal}`);
    author.val(authorVal);
    content.val(contentVal);
    id.val(idVal);
    toggleForm();
}

function delCar(e) {
    e.preventDefault();
    
    let el = $(e.srcElement);
    let blogid = el.data("blogid");
    if(confirm(`Are you sure you want to delete post #${blogid}`)) {
        $.ajax({
                method: "DELETE",
                url: `${_baseUrl}:${_port}/api/car/${blogid}`
            })
            .done(function(msg) {
                getCars();
            });
    }
}

function toggleForm() {
    // console.log('toggling form...');
    const form = document.getElementById('addBlogForm');
    form.classList.toggle('hide-form');
}

function toggleSearch() {
    document.getElementById('searchContainer').classList.toggle('hide-search');
}

function toggleLogin() {
    document.getElementById('loginContainer').classList.toggle('hide-search');
}

function logMeIn(event) {
    // prevent default submit
    event.preventDefault();
    // assign field values to variables
    let username = $("#username").val();
    let password = $("#password").val();
    // make the post request
    jQuery.post(`${_baseUrl}:${_port}/api/user/login`, {username: username, password: password}, function(result) {
        // console.log(result);
        // according to the controller, if the record isnt found the resulting data is returned null instead of a 404
        if (result.data === null) {
            // thus display error if resulting data is null
            document.getElementById('loginInfo').innerHTML=`<h4 class="red-text">Bad login info, try again</h4>`;
        } else {
            // otherwise, login is successful. assign username to loggin in user var
            // if we want to do something else with the rest of the data, this is where we do it. otherwise, everything else stays inside this scope
            document.getElementById('loginInfo').innerHTML=`<h4>Logged in as ${username}</h4>`;
            _loggedInUser = username;
            document.cookie = `username=${username}`;
            // clear input values and hide login box
            $('#username').val("");
            $('#password').val("");
            toggleLogin();
        }
    })
}

// w3 schools get cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// run getCars on 
$(function() {
    // server is running from same IP as front-end so get the hostname
    _baseUrl = `http://${window.location.hostname}`;
    getCars();
    $("#add-car").on('submit', addCar);
    document.getElementById('addBlogPostButton').addEventListener('click', toggleForm);
    // document.getElementById('hideAddForm').addEventListener('click', toggleForm);
    let cookieUser = getCookie('username');
    if (cookieUser) {
        document.getElementById('loginInfo').innerHTML=`<h4>Logged in as ${cookieUser}</h4>`;
    }
});