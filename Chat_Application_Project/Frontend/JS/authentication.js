// Catching HTML Elements

let welcomeScreen = document.querySelector("#welcome-screen");
let loginScreen = document.querySelector(".login-screen");
let signupScreen = document.querySelector(".signup-screen");
let emailScreen = document.querySelector(".email-screen");
let userNamePasswordLoginError = document.querySelector(
  "#username-error-login",
);
let passwordLoginError = document.querySelector("#password-error-login");
let userNamePasswordSignupError = document.querySelector(
  "#username-error-signup",
);
let passwordSignupError = document.querySelector("#password-error-signup");
let emailError = document.querySelector("#email-error");
let emailFormatError = document.querySelector("#email-format-error");

// Catching all Buttons
const loginButton = document.querySelector("#login-button");
const signupButton = document.querySelector("#signup-button");
const nextButton = document.querySelector("#next-button");
const accountSigupButton = document.querySelector(
  "#account-creation-login-btn",
);
const accountLoginButton = document.querySelector("#account-login-button");
const forgotPassword = document.querySelector("#forgot-password");

// Catching all inputs fields
let inputUserNameForSignup = document.querySelector("#username-for-signup");
let inputPasswordForSignup = document.querySelector("#password-for-signup");
let userEmail = document.querySelector("#email");
let inputUserNameForlogin = document.querySelector("#username-for-login");
let inputPasswordForlogin = document.querySelector("#password-for-login");

let forSignUp = false;

// Login Section all funtionality

loginScreen.classList.add("hide");
signupScreen.classList.add("hide");
emailScreen.classList.add("hide");

loginButton.addEventListener("click", () => {
  welcomeScreen.classList.add("hide");
  loginScreen.classList.remove("hide");
});
signupButton.addEventListener("click", () => {
  welcomeScreen.classList.add("hide");
  signupScreen.classList.remove("hide");
});
forgotPassword.addEventListener("click", () => {
  loginScreen.classList.add("hide");
  emailScreen.classList.remove("hide");
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

accountLoginButton.addEventListener("click", async () => {
  if (!inputUserNameForlogin.value || !inputPasswordForlogin.value) {
    passwordLoginError.classList.add("hide");
    userNamePasswordLoginError.classList.remove("hide");
  } else if (!passwordRegex.test(inputPasswordForlogin.value)) {
    userNamePasswordLoginError.classList.add("hide");
    passwordLoginError.classList.remove("hide");
  } else {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputUserNameForlogin.value,
          password: inputPasswordForlogin.value,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        window.location.href = "chat.html";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Error : ", error);
      alert("Something went wrong. Please try again.");
    }
  }
});

// Signup Section all functionality

nextButton.addEventListener("click", () => {
  if (!inputUserNameForSignup.value || !inputPasswordForSignup.value) {
    passwordSignupError.classList.add("hide");
    userNamePasswordSignupError.classList.remove("hide");
  } else if (!passwordRegex.test(inputPasswordForSignup.value)) {
    userNamePasswordSignupError.classList.add("hide");
    passwordSignupError.classList.remove("hide");
  } else {
    forSignUp = true;
    signupScreen.classList.add("hide");
    emailScreen.classList.remove("hide");
  }
});

accountSigupButton.addEventListener("click", async () => {
  if (!userEmail.value) {
    emailFormatError.classList.add("hide");
    emailError.classList.remove("hide");
  } else if (!emailRegex.test(userEmail.value)) {
    emailError.classList.add("hide");
    emailFormatError.classList.remove("hide");
  } else {
    if (forSignUp) {
      emailFormatError.classList.add("hide");
      try {
        const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: inputUserNameForSignup.value,
            email: userEmail.value,
            password: inputPasswordForSignup.value,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message);
          window.location.href = "chat.html";
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.log("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    } else {
      emailFormatError.classList.add("hide");
      try {
        const response = await fetch("http://localhost:5000/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail.value,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message);
          window.location.href = "chat.html";
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.log("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  }
});
