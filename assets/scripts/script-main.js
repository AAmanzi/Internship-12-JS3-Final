let loggedIn = false;

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
      `<div class="users__item">
        <img class="item__img" src="./assets/images/test_image.jpg" alt="Offer" />
        <img class="item__heart-shape" src="./assets/images/heart-shape.png" alt="Hearth Shape">
        <img class="item__heart-full" src="./assets/images/heart.png" alt="Hearth Full">
        <p class="item__img-description">${user.username}</p>
        <p class="item__paragraph">
            ${user.email}
        </p>
        <span class="item__price">${user.address.city}</span>
      </div>`;
    });
  })
  .then(() => {
    let allUsersHTML = document.querySelectorAll(".users__item");

    allUsersHTML.forEach(user => {
      user.addEventListener("mouseover", function() {
        let itemDescription = user.querySelector(".item__img-description");
        itemDescription.classList.add("item__img-description-hover");
      });

      user.addEventListener("mouseout", function() {
        let itemDescription = user.querySelector(".item__img-description");
        itemDescription.classList.remove("item__img-description-hover");
      });
      
      let itemHeart = user.querySelector(".item__heart-full");

      itemHeart.addEventListener("click", function(event) {
        itemHeart.classList.toggle("item__heart-full-click");
        event.stopPropagation();
      });

      //item click event (posts)

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