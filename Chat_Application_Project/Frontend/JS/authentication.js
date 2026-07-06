let welcomeScreen = document.querySelector("#welcome-screen");
let loginScreen = document.querySelector(".login-screen");
let signupScreen = document.querySelector(".signup-screen");
let emailScreen = document.querySelector(".email-screen")

const loginButton = document.querySelector("#login-button")
const signupButton = document.querySelector("#signup-button")
const nextButton = document.querySelector("#next-button")
const accountCreateButton = document.querySelector("email")

loginScreen.classList.add("hide")
signupScreen.classList.add("hide")
emailScreen.classList.add("hide")

loginButton.addEventListener("click", () => {

    welcomeScreen.classList.add("hide");
    loginScreen.classList.remove("hide");
})
signupButton.addEventListener("click", () => {

    welcomeScreen.classList.add("hide")
    signupScreen.classList.remove("hide")
})
nextButton.addEventListener("click", () => {

    emailScreen.classList.remove("hide")
    signupScreen.classList.add("hide")
})