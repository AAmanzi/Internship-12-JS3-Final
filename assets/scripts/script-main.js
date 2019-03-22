document.querySelector(".logo__container").addEventListener("click", () => {
  displayMainPage();
});

document.querySelector(".button-full").addEventListener("click", () => {
  displaySignup();
});

document.querySelector(".button-login").addEventListener("click", () => {
  displayLogin();
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
};

function displayUsers(){

};

function addUser(){
  let addUserForm = document.addUserForm;

  if(anyErrors())
    return false;
  
  let newUser = {
    username: addUserForm.username.value,
    email: addUserForm.email.value,
    password: addUserForm.password.value
  };
  
  return true;
  
  function anyErrors(){
    let error = document.querySelector(".signup__error");
    if(addUserForm.username.validity.valueMissing ||
      addUserForm.email.validity.valueMissing ||
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

    error.innerHTML = "";
    return false;
  }
};