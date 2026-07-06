let welcomeScreen = document.querySelector("#welcome-screen");
let loginScreen = document.querySelector(".login-screen");
let signupScreen = document.querySelector(".signup-screen");
let emailScreen = document.querySelector(".email-screen")
let errorMessage = document.querySelector("#username-or-password-error")
let passwordError = document.querySelector("#password-error")
let emailError = document.querySelector("#email-error")
let emailFormatError = document.querySelector("#email-format-error")

const loginButton = document.querySelector("#login-button")
const signupButton = document.querySelector("#signup-button")
const nextButton = document.querySelector("#next-button")
const accountCreateButton = document.querySelector("#account-creation-login-btn")

let inputUserName = document.querySelector("#username-for-signup")
let inputPassword = document.querySelector("#password-for-signup")
let userEmail = document.querySelector("#email")

loginScreen.classList.add("hide")
signupScreen.classList.add("hide")
emailScreen.classList.add("hide")
// errorMessage.classList.add("error-hide")

loginButton.addEventListener("click", () => {

    welcomeScreen.classList.add("hide");
    loginScreen.classList.remove("hide");
})
signupButton.addEventListener("click", () => {

    welcomeScreen.classList.add("hide")
    signupScreen.classList.remove("hide")
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

nextButton.addEventListener("click", () => {

    // if(!inputUserName.value || !inputPassword.value) {
        
    //     passwordError.classList.add("hide")
    //     errorMessage.classList.remove("hide")
    // }
    // else if (!passwordRegex.test(inputPassword.value)) {

    //     errorMessage.classList.add("hide")
    //     passwordError.classList.remove("hide")
    // }
    // else {

        signupScreen.classList.add("hide")
        emailScreen.classList.remove("hide")
    // }
})

accountCreateButton.addEventListener("click", () => {

    if (!userEmail.value) {
        
        emailFormatError.classList.add("hide")
        emailError.classList.remove("hide")
    }
    else if (!emailRegex.test(userEmail.value)) {
        
        emailError.classList.add("hide")
        emailFormatError.classList.remove("hide")
    }
})