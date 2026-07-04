let welcomeScreen = document.querySelector("#welcome-screen");
let loginScreen = document.querySelector(".login-screen");
let signupScreen = document.querySelector(".signup-screen");

const loginButton = document.querySelector("#login-button")
const signupButton = document.querySelector("#signup-button")

loginScreen.classList.add("hide")
signupScreen.classList.add("hide")

loginButton.addEventListener("click", () => {

    welcomeScreen.classList.add("hide");
    loginScreen.classList.remove("hide");
})
signupButton.addEventListener("click", () => {

    welcomeScreen.classList.add("hide")
    signupScreen.classList.remove("hide")
})