let loggedIn = false;
//SETUP NA FALSE PRIJE ROKA

document.querySelector(".logo__container").addEventListener("click", () => {
  displayMainPage();
});

document.querySelector(".button-full").addEventListener("click", () => {
  displaySignup();
});

document.querySelector(".button-login").addEventListener("click", () => {
  displayLogin();
});

document.querySelector(".button-users").addEventListener("click", () => {
  displayUsers();
});

function displayLogin(){
  document.querySelector(".signup__container").classList.remove("visible");
  
  document.querySelector(".login__container").classList.remove("display-none");
  document.querySelector(".login__container").classList.add("visible");
};

function displaySignup(){
  document.querySelector(".signup__container").classList.add("visible");

  document.querySelector(".header__image__container").classList.add("display-none");
  document.getElementsByTagName("main")[0].classList.add("display-none");
  document.getElementsByTagName("footer")[0].classList.add("display-none");

  document.querySelector(".login__container").classList.add("display-none");
  document.querySelector(".login__container").classList.remove("visible");
};

function displayMainPage(){
  document.querySelector(".signup__container").classList.remove("visible");

  document.querySelector(".header__image__container").classList.remove("display-none");
  document.getElementsByTagName("main")[0].classList.remove("display-none");
  document.getElementsByTagName("footer")[0].classList.remove("display-none");

  document.querySelector(".login__container").classList.add("display-none");
  document.querySelector(".login__container").classList.remove("visible");

  document.querySelector(".main__users").innerHTML = "";
};

function displayUsers(){
  if(!loggedIn){
    return false;
  }
  document.querySelector(".header__image__container").classList.add("display-none");
  document.getElementsByTagName("main")[0].classList.add("display-none");
  document.getElementsByTagName("footer")[0].classList.add("display-none");
  document.querySelector(".login__container").classList.add("display-none");
  document.querySelector(".login__container").classList.remove("visible");

  let userPlaceholder = document.querySelector(".main__users");

  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(allUsers => {
    allUsers.forEach(user => {
      userPlaceholder.innerHTML += 
      `<div id="${user.id}" class="users__item">
        <img class="item__img" src="./assets/images/test_image.jpg" alt="Offer" />
        <img class="item__heart-shape" src="./assets/images/heart-shape.png" alt="Hearth Shape">
        <img class="item__heart-full" src="./assets/images/heart.png" alt="Hearth Full">
        <p class="item__img-description">${user.name}</p>
        <p class="item__paragraph">
            ${user.email}
        </p>
        <span class="item__price">${user.address.city}</span>

        <button class="button__posts">Posts</button>
      </div>`;
    });

    userPlaceholder.innerHTML += '<span class="scroll-top display-none">^</span>';
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

            userInfo.innerHTML += `
              <div class="user__posts__wrapper">
                <button class="button-close__popup button-close__popup--alt">Close</button>
              </div>`;

            let userPostsWrapper = userInfo.querySelector(".user__posts__wrapper");

            posts.forEach(post => {
              userPostsWrapper.innerHTML += `
              <div class="post__item">
                    <p>
                        post id: ${post.id} <br>
                        title: ${post.title} <br>
                        ${post.body}
                    </p>
              </div>`;
            });

            userInfo.classList.remove("display-none");

            document.getElementsByTagName("body")[0].classList.add("overflow-hidden");

            buttonClose = userInfo.querySelector(".button-close__popup");
            buttonClose.addEventListener("click", () => {
              userInfo.innerHTML = "";
              userInfo.classList.add("display-none");
              document.getElementsByTagName("body")[0].classList.remove("overflow-hidden");
            })
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
              <div class="user__info__wrapper">
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

            buttonClose = userInfo.querySelector(".button-close__popup");
            buttonClose.addEventListener("click", () => {
              userInfo.innerHTML = "";
              userInfo.classList.add("display-none");
              document.getElementsByTagName("body")[0].classList.remove("overflow-hidden");
            });
          });
      });



    });
  });
};

function toggleLoginButton(){
  document.querySelector(".button-full").classList.toggle("display-none");
}

function addUser(){
  let addUserForm = document.addUserForm;

  if(anyErrors())
    return false;
  
  let newUser = {
    username: addUserForm.username.value,
    password: addUserForm.password.value
  };

  window.localStorage.setItem(newUser.username, newUser.password);
  
  return true;
  
  function anyErrors(){
    let error = document.querySelector(".signup__error");
    if(addUserForm.username.validity.valueMissing ||
      addUserForm.password.validity.valueMissing ||
      addUserForm.repeatPassword.validity.valueMissing){
      error.innerHTML = "All fields are required!";
      return true;
    }
    
    if(addUserForm.username.validity.tooShort){
      error.innerHTML = "Your username must be at least 5 characters long!";
      return true;
    }

    if(addUserForm.password.validity.tooShort){
      error.innerHTML = "Your password must be at least 5 characters long!";
      return true;
    }

    if(addUserForm.repeatPassword.value !== addUserForm.password.value){
      error.innerHTML = "Your passwords must match!";
      return true;
    }

    if(window.localStorage.getItem(addUserForm.username.value)){
      error.innerHTML = "That username is already taken!";
      return true;
    }

    error.innerHTML = "";
    return false;
  }
};

function logIn(){
  let getUserForm = document.getUserForm;

  if(anyErrors())
    return false;

  loggedIn = true;
  toggleLoginButton();
  displayUsers();

  function anyErrors(){
    let error = document.querySelector(".login__error");
    
    if(window.localStorage.getItem(getUserForm.username.value) !== 
      getUserForm.password.value){
        error.innerHTML = "Username or password incorrect!";
        return true;
      }

    error.innerHTML = "";
    return false;
  }
}