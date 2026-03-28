let userEmail = null;
let userPassword = null;

let formContainer = document.querySelector(".form-container");
let createNewAccount = document.querySelector("#create-Newaccount");
// let logIn = document.querySelector("#login");

let loginHtml = formContainer.innerHTML;

createNewAccount.addEventListener("click", function (e) {
  e.preventDefault();

  history.pushState({ page: "signup" }, "", "/signup");

  let newHtml = (formContainer.innerHTML = `
       <div class="create-newAccount">
        <h3>Enter your personal infomation</h3>
        <form class="new-accoutn-form">
          <div>
            <input type="text" class="userName" placeholder="First name" />
            <small class="firstNameErorr">name should be more than 2</small>
            <input type="text" class="userSurname" placeholder="Surname" />
            <small class="SurNameErorr">surname should be more than 2</small>
          </div>
          <div>
            <small>Select date of birth</small>
            <input type="date" />
          </div>
          <div>
            <small>Select Gender</small><br />
            <input type="radio" name="gender-check" value="male" /> Male <br />
            <input type="radio" name="gender-check" value="female" /> Female
            <br />
          </div>
          <div>

            <input type="email" id="email"placeholder="Email address or phone number" />
            <small class="emailError">invalid email</small>
            <input type="password" id="password" placeholder="password" />
            <small class="passwordError">invalid password</small>
             
          </div>
          <div class="signup-button">
            <a href="#" id="signup-form">SignUp</a>
          </div>
        </form>
      </div>
        `);
  window.onpopstate = function (event) {
    if (!event.state || event.state.page !== "signup") {
      formContainer.innerHTML = loginHtml;
    } else if (event.state || event.state.page === "signup") {
      formContainer.innerHTML = newHtml;
    }
  };
  let userFirstName = document.querySelector(".userName");
  let userSurName = document.querySelector(".userSurname");
  let firstNameError = document.querySelector(".firstNameErorr");
  let surNameError = document.querySelector(".SurNameErorr");

  userFirstName.addEventListener("input", function () {
    if (userFirstName.value.length <= 2) {
      firstNameError.style.display = "inline";
    } else {
      firstNameError.style.display = "none";
    }
  });
  userSurName.addEventListener("input", function () {
    if (userSurName.value.length <= 2) {
      surNameError.style.display = "inline";
    } else {
      surNameError.style.display = "none";
    }
  });

  

  let emailField = document.querySelector("#email");
  let passwordField = document.querySelector("#password");
  let emailError = document.querySelector(".emailError");
  let passwordError = document.querySelector(".passwordError");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  emailField.addEventListener("input", function () {

    if (emailRegex.test(emailField.value)) {
      userEmail = emailField.value;
      emailError.style.display = "none";
    } 
    else {
      emailError.style.display = "inline";
    }

  });
  passwordField.addEventListener("input", function () {

    if (passwordRegex.test(passwordField.value)) {

      userPassword = passwordField.value;
      passwordError.style.display = "none";
    } 
    else {
      passwordError.style.display = "inline";
    }

  });

  signUptheForm.addEventListener("click", function (e) {
    e.preventDefault();
    let isValid = true;

    if (userFirstName.value.length <= 2) {
      firstNameError.style.display = "inline";
      isValid = false;
    } 
    else {
      firstNameError.style.display = "none";
    }
    if (userSurName.value.length <= 2) {
      surNameError.style.display = "inline";
      isValid = false;
    } 
    else {
      surNameError.style.display = "none";
    }

    if (isValid) {
      alert("Account Created Successfully");
    }
  }); 
});
