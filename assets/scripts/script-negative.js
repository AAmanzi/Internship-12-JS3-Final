document.querySelector(".button-change").addEventListener("click", () => {
  if(isDark)
    isDark = false;
  else
    isDark = true;

  document.querySelector("body").classList.toggle("background-darker");
  document.querySelector(".root").classList.toggle("color-white");
  document.querySelector(".button-login").classList.toggle("color-grey");
  document.querySelector(".button-users").classList.toggle("color-grey");
  document.querySelector(".logo-negative").classList.toggle("visible");
  document.querySelector(".logo").classList.toggle("invisible");

  document.querySelector(".user__popup").classList.toggle("user__popup--alt");

  document.querySelectorAll(".logo--alt-negative")[0].classList.toggle("visible");
  document.querySelectorAll(".logo--alt")[0].classList.toggle("invisible");
  document.querySelectorAll(".logo--alt-negative")[1].classList.toggle("visible");
  document.querySelectorAll(".logo--alt")[1].classList.toggle("invisible");

  document.querySelector(".button-image-negative").classList.toggle("visible");
  document.querySelector(".button-image").classList.toggle("invisible");

  document.querySelector(".header__image-negative").classList.toggle("visible");

  document.querySelector("nav").classList.toggle("background-dark");
  document.querySelector(".header__image__container").classList.toggle("background-dark");


  let socialButtons = document.querySelectorAll(".button-social");
  for (let i = 0; i < socialButtons.length; i++) {
    socialButtons[i].classList.toggle("background-dark");
  }

  let signupArticles = document.querySelectorAll(".signup__article");
  for (let i = 0; i < signupArticles.length; i++) {
    signupArticles[i].classList.toggle("background-dark");
  }

  let signupInputs = document.querySelectorAll(".signup__input");
  for (let i = 0; i < signupInputs.length; i++) {
    signupInputs[i].classList.toggle("background-dark");
    signupInputs[i].classList.toggle("color-white");
  }
});

