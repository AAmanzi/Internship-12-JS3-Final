let loggedIn = true;
let isDark = false;
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

function toggleLoginButton(){
  document.querySelector(".button-full").classList.toggle("display-none");
};

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
};