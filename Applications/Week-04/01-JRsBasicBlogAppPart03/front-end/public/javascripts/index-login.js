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

MyBlogApp.getPosts = function() {
    let blogContainer = document.getElementById('post-list');
    console.log('Getting..');
    blogContainer.innerHTML = '';
    jQuery.get(`${_baseUrl}:3000/api/post`, function(data) {
        data.data.forEach((blogpost) => {
            let postDate = formatDate(new Date(blogpost.created_at));
            let newBlogItem = document.createElement('div');
            let author = `<h5>Posted by ${blogpost.author}</h5>`;
            let title = `<h3 class="blog-item-title">${blogpost.title}</h3>`
            let body = `<p>${blogpost.post}</p>`;
            let date = `<p>${postDate} - ${blogpost.id}</p>`;
            let buttonRow = `<div class="blog-item-button-row">
            <a href="#" data-blogid="${blogpost.id}" onclick="MyBlogApp.delPost(event)" class="btn btn-danger">Delete Post</a>
            <span class="text-center">${blogpost.id}</span>
            <a href="#" data-blogid="${blogpost.id}" data-blogauthor="${blogpost.author}" data-blogcontent="${blogpost.post}" data-blogtitle="${blogpost.title}" onclick="MyBlogApp.editPost(event)" class="btn btn-success">Edit Post</a>
            </div>`;
            
            newBlogItem.innerHTML = title + body + author + date + buttonRow;
            newBlogItem.classList.add('blog-item');
            blogContainer.appendChild(newBlogItem);

        });
    });
}

MyBlogApp.addPost = function(e) {
    e.preventDefault();
    let author = MyBlogApp.getCookie('realusername');
    let title = $("#title");
    let content = $("#content");
    let blogid = $("#blogid");

    let titleVal = title.val();
    let contentVal = content.val();

    if(titleVal == "" || contentVal == "") {
        alert('Author and Content cannot be blank');
        return;
    }

    if (+blogid.val() === 0) {
        jQuery.post(`${_baseUrl}:${_port}/api/post`, { title: titleVal, author: author, post: contentVal }, function(data) {
            MyBlogApp.getPosts();
        });
    } else {
        $.ajax({
                method: "PUT",
                url: `${_baseUrl}:${_port}/api/post/${blogid.val()}`,
                data: { title: title.val(), author: author, post: content.val() }
            })
            .done(function(msg) {
                MyBlogApp.getPosts();
            });
    }

    blogid.val(0);
    $("#blog-submit").val('Add Post');
    title.val("");
    content.val("");
    MyBlogApp.toggleForm();
}

MyBlogApp.editPost = function(e) {
    e.preventDefault();
    let el = $(e.srcElement);
    let title = $("#title");
    let content = $("#content");
    let id = $("#blogid");
    

    let authorVal = el.data("blogauthor");
    let contentVal = el.data("blogcontent");
    let idVal = el.data("blogid");
    let titleVal = el.data("blogtitle");

    $("#blog-submit").val(`Edit Blog #${idVal}`);
    title.val(titleVal);
    content.val(contentVal);
    id.val(idVal);
    MyBlogApp.toggleForm();
}

MyBlogApp.delPost = function(e) {
    e.preventDefault();
    
    let el = $(e.srcElement);
    let blogid = el.data("blogid");
    if(confirm(`Are you sure you want to delete post #${blogid}`)) {
        $.ajax({
                method: "DELETE",
                url: `${_baseUrl}:${_port}/api/post/${blogid}`
            })
            .done(function(msg) {
                MyBlogApp.getPosts();
            });
    }
}

MyBlogApp.searchPosts = function(e) {
    console.log('Searching...');
    e.preventDefault();
    // let order = $('#orderType').val();
    let list = document.getElementById("post-list");
    list.innerHTML = "";
    let searchVal = $('#searchField').val();
    $('#search').val("");

    jQuery.post(`${_baseUrl}:${_port}/api/post/search`, { search: searchVal}, function(data) {
        data.data.forEach((blogpost) => {
            let postDate = formatDate(new Date(blogpost.created_at));
            let newBlogItem = document.createElement('div');
            let author = `<h5>Posted by ${blogpost.author}</h5>`;
            let title = `<h3 class="blog-item-title">${blogpost.title}</h3>`
            let body = `<p>${blogpost.post}</p>`;
            let date = `<p>${postDate} - ${blogpost.id}</p>`;
            let buttonRow = `<div class="blog-item-button-row">
            <a href="#" data-blogid="${blogpost.id}" onclick="MyBlogApp.delPost(event)" class="btn btn-danger">Delete Post</a>
            <span class="text-center">${blogpost.id}</span>
            <a href="#" data-blogid="${blogpost.id}" data-blogauthor="${blogpost.author}" data-blogcontent="${blogpost.post}" data-blogtitle="${blogpost.title}" onclick="MyBlogApp.editPost(event)" class="btn btn-success">Edit Post</a>
            </div>`;
            
            newBlogItem.innerHTML = title + body + author + date + buttonRow;
            newBlogItem.classList.add('blog-item');
            list.appendChild(newBlogItem);
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


// run getCars on 
$(function() {
    // server is running from same IP as front-end so get the hostname
    _baseUrl = `http://${window.location.hostname}`;
    $("#add-post").on('submit', MyBlogApp.addPost);
    $("#searchForm").on('submit', MyBlogApp.searchPosts);
    loginButtonCheck();
    MyBlogApp.getPosts();
});