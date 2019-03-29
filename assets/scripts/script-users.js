function displayUsers(){
  if(!loggedIn){
    return false;
  }
  
  document.querySelector(".header__image__container").classList.add("display-none");
  document.getElementsByTagName("main")[0].classList.add("display-none");
  document.getElementsByTagName("footer")[0].classList.add("display-none");
  document.querySelector(".login__container").classList.add("display-none");
  document.querySelector(".login__container").classList.remove("visible");

  (function addUserFunctionalities(){
    let userPlaceholder = document.querySelector(".main__users");
  
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(allUsers => {
      (function loadUsers(){
        allUsers.forEach(user => {
          userPlaceholder.innerHTML += 
          `<div id="${user.id}" class="users__item">
            <img class="item__img" src="./assets/images/test_image.jpg" alt="Offer" />
            <img class="item__heart-shape ${isDark ? "item__heart-shape--alt": ""}" src="./assets/images/heart-shape.png" alt="Hearth Shape">
            <img class="item__heart-full ${isDark ? "item__heart-full--alt": ""}" src="./assets/images/heart.png" alt="Hearth Full">
            <p class="item__img-description ${isDark ? "item__img-description--alt": ""}">${user.name}</p>
            <p class="item__paragraph">
                ${user.email}
            </p>
            <span class="item__price">${user.address.city}</span>
    
            <button class="button__posts">Posts</button>
          </div>`;
        });
    
        userPlaceholder.innerHTML += '<span class="scroll-top display-none">^</span>';
      })();
    })
    .then(() => {
      let allUsersHTML = document.querySelectorAll(".users__item");
  
      window.addEventListener("scroll", () => {
        let scrollTop = userPlaceholder.querySelector(".scroll-top");
        if(window.scrollY >= 100){
          scrollTop.classList.remove("display-none");  
          userPlaceholder.querySelector(".scroll-top").addEventListener("click", () => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
          });  
        }
        else{
          scrollTop.classList.add("display-none");
        }
      })
  
      allUsersHTML.forEach(user => {
        user.addEventListener("mouseover", () => {
          let itemDescription = user.querySelector(".item__img-description");
          itemDescription.classList.add("item__img-description-hover");
        });
  
        user.addEventListener("mouseout", () => {
          let itemDescription = user.querySelector(".item__img-description");
          itemDescription.classList.remove("item__img-description-hover");
        });
        
        let itemHeart = user.querySelector(".item__heart-full");
  
        itemHeart.addEventListener("click", (event) => {
          itemHeart.classList.toggle("item__heart-full-click");
          event.stopPropagation();
        });
  
        let postsButton = user.querySelector(".button__posts");
  
        postsButton.addEventListener("click", (event) => {
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
            .then(response => response.json())
            .then(posts => {
              let userInfo = document.querySelector(".user__popup");
  
              userInfo.innerHTML = `
                <div class="user__posts__wrapper ${isDark ? "background-darker": ""}"></div>`;
  
              let userPostsWrapper = userInfo.querySelector(".user__posts__wrapper");
  
              refreshPosts();
  
              userInfo.classList.remove("display-none");
  
              document.getElementsByTagName("body")[0].classList.add("overflow-hidden");
  
              function addPost(){
                var addPostForm = document.addPostForm;
              
                if(anyErrors()){
                  return false;
                }
              
                let newPost = {
                  title: addPostForm.title.value,
                  body: addPostForm.body.value
                };
              
                fetch('https://jsonplaceholder.typicode.com/posts', 
                {
                    method: 'POST',
                    body: JSON.stringify(
                    {
                       title: newPost.title,
                       body: newPost.body,
                       userId: user.id
                    }),
                    headers: 
                    {
                      "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(response => response.json())
                .then(post => {
                  let postItem = {
                    title: post.title,
                    body: post.body,
                    postId: post.id
                  }
  
                  let posts = [];
                  posts.push(postItem);
  
                  let storedPosts = JSON.parse(sessionStorage.getItem(user.id));
                  
  
                  if(storedPosts){
                    storedPosts.forEach(post => {
                      posts.push(post);
                      postItem.postId++;
                    });
                  }
  
                  sessionStorage.setItem(user.id, JSON.stringify(posts));
  
                  refreshPosts();
                })
              
                return true;
              
                function anyErrors(){
                  if(addPostForm.title.validity.valueMissing ||
                    addPostForm.body.validity.valueMissing){
                    return true;
                  }
                  return false;
                }
              }
  
              function refreshPosts(){
                userPostsWrapper.innerHTML = `<button class="button-close__popup button-close__popup--alt">Close</button>
                  <form name="addPostForm" class="post__new">
                    <input name="title" class="post__new-title ${isDark ? "background-dark color-white": ""}" type="text" placeholder="Your post's title" required>
                    <textarea name="body" type="text" class="post__new-body ${isDark ? "background-dark color-white": ""}" cols="50" rows="5" placeholder="Write something here" required></textarea>
                  </form>
                  <button class="button-post__add  ${isDark ? "background-dark color-grey": ""}">Post</button>`;
  
                let storedPosts = JSON.parse(sessionStorage.getItem(user.id));
                
                if(storedPosts)
                  storedPosts.forEach(post => {
                    userPostsWrapper.innerHTML += `
                    <div class="post__item">
                          <p>
                              post id: ${post.postId} <br>
                              title: ${post.title} <br>
                              ${post.body}
                          </p>
                    </div>`;
                  });
  
                posts.reverse().forEach(post => {
                  userPostsWrapper.innerHTML += `
                  <div class="post__item">
                        <p>
                            post id: ${post.id} <br>
                            title: ${post.title} <br>
                            ${post.body}
                        </p>
                  </div>`;
                });
  
                let buttonClose = userInfo.querySelector(".button-close__popup");
                buttonClose.addEventListener("click", () => {
                  userInfo.innerHTML = "";
                  userInfo.classList.add("display-none");
                  document.getElementsByTagName("body")[0].classList.remove("overflow-hidden");
                });
  
                let buttonPost = userInfo.querySelector(".button-post__add");
                buttonPost.addEventListener("click", () => {
                  addPost();
                });
              }
            });
  
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
  
            event.stopPropagation();
        });
  
        user.addEventListener("click", () => {
  
          fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`)
            .then(response => response.json())
            .then(user => {
              let userInfo = document.querySelector(".user__popup");
  
              userInfo.innerHTML = `
                <div class="user__info__wrapper ${isDark ? "background-darker": ""}">
                  <div class="user__info">
                    <h1 class="user__name">${user.name}</h1>
                    
                    <p class="user__info__main">
                      username: ${user.username} <br>
                      email: ${user.email} <br>
                      phone: ${user.phone} <br>
                      website: ${user.website} <br>
                    </p>
                    
                    <h2 class="user__address__title">Address:</h2>
                    
                    <p class="user__info__address">
                      street: ${user.address.street} <br>
                      city: ${user.address.city} <br>
                      zipcode: ${user.address.zipcode} <br>
                      suite: ${user.address.suite} <br>
                    </p>
  
                    <h2 class="user__company__title">Company:</h2>
  
                    <p class="user__info__company">
                      Name: ${user.company.name} <br>
                    </p>
                  </div>
                  <button class="button-close__popup">Close</button>
                </div>`;
  
              userInfo.classList.remove("display-none");
  
              document.getElementsByTagName("body")[0].classList.add("overflow-hidden");
  
              let buttonClose = userInfo.querySelector(".button-close__popup");
              buttonClose.addEventListener("click", () => {
                userInfo.innerHTML = "";
                userInfo.classList.add("display-none");
                document.getElementsByTagName("body")[0].classList.remove("overflow-hidden");
              });
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
              });
            });
        });
      });
    });
  })();
};