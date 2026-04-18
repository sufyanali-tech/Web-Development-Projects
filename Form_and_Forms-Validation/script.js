let userEmail = null;
let userPassword = null;

let formContainer = document.querySelector(".form-container");
let createNewAccount = document.querySelector("#create-Newaccount");

let loginHtml = formContainer.innerHTML;

let userEmailStore = null;
let userPasswordStore = null;
let logInNewPage = "null";
let createNewAccountHtml = "null";

let logInEmail = document.querySelector("#loginemail");
let logInPassword = document.querySelector("#loginpassword");
let logIn = document.querySelector("#login");

logIn.addEventListener("click", function (e) {
  e.preventDefault();

  history.pushState({ page: "login" }, "", "/login");

  let loginSuccessfull = document.querySelector("#loginsuccessful");
  let body = document.querySelector("body");

  logInNewPage = formContainer.innerHTML = `
    
    <div id="loginsuccessful">
      <h1>Login Successful ✔</h1>
    </div>
    `;
});
// Document of Create new Account

createNewAccount.addEventListener("click", function (e) {
  e.preventDefault();

  history.pushState({ page: "signup" }, "", "/signup");

  createNewAccountHtml = formContainer.innerHTML = `
       <div class="create-newAccount">
        <h3>Enter your personal infomation</h3>
        <form class="new-accoutn-form">
        <div id="input-container">
          <small>Name</small>
            <div id="user-input-fields" > 
              <input type="text" id="userInputFields" class="userName" placeholder="First name" />
              <small class="firstNameErorr">character should be more than 2</small>
              <input type="text" id="userInputFields" class="userSurname" placeholder="Surname" />
              <small class="SurNameErorr">character should be more than 2</small>
            </div>
          </div>
          <div id="dob-container">
            <small>Date of birth</small>
              <div id="dob-selection-container">
                <select id="day-selection">
                  <option value="" hidden >Day</option>
                </select>
                <select id="month-selection">
                  <option value="" hidden>Month</option>
                </select>
                <select id="year-selection">
                  <option value="" hidden>Year</option>
                </select>
              </div>
            </div>
          <div id="gender-container">
            <small>Gender</small>
              <select id="gender">
                <option value="" hidden>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="custom">Custom</option>
              </select>
          </div>
          <div id="input-container">
              <small>Email</small>
              <input type="email" id="email"placeholder="Email address or phone number" />
              <small class="emailError">invalid email</small>
              <small>Password</small>
              <input type="password" id="password" placeholder="password"/>
              <small class="passwordError">invalid password</small> 
          </div>
          <div class="signup-button">
            <a href="#" id="signup-form">SignUp</a>
          </div>
        </form>
      </div>`;

  let daySelection = document.querySelector("#day-selection");
  let monthSelection = document.querySelector("#month-selection");
  let yearSelection = document.querySelector("#year-selection");

  for (let i = 1; i <= 31; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    daySelection.appendChild(option);
  }

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  months.forEach(function (month, index) {
    let option = document.createElement("option");
    option.value = index + 1;
    option.textContent = month;
    monthSelection.appendChild(option);
  });
  let currentYear = new Date().getFullYear();
  console.log(currentYear);

  for (let y = currentYear; y > 1950; y--) {
    let option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelection.appendChild(option);
  }
  let userFirstName = document.querySelector(".userName");
  let userSurName = document.querySelector(".userSurname");
  let firstNameError = document.querySelector(".firstNameErorr");
  let surNameError = document.querySelector(".SurNameErorr");

  let emailField = document.querySelector("#email");
  let passwordField = document.querySelector("#password");
  let emailError = document.querySelector(".emailError");
  let passwordError = document.querySelector(".passwordError");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  userFirstName.addEventListener("input", function () {
    if (userFirstName.value.length === 0 || userFirstName.value.length > 2) {
      firstNameError.style.display = "none";
    } else {
      firstNameError.style.display = "inline";
    }
  });
  userSurName.addEventListener("input", function () {
    if (userSurName.value.length === 0 || userSurName.value.length > 2) {
      surNameError.style.display = "none";
    } else {
      surNameError.style.display = "inline";
    }
  });

  emailField.addEventListener("input", function () {
    if (emailRegex.test(emailField.value)) {
      userEmail = emailField.value;
      emailError.style.display = "none";
    } else {
      emailError.style.display = "inline";
    }
    userEmailStore = emailField.value;
  });

  passwordField.addEventListener("input", function () {
    if (passwordRegex.test(passwordField.value)) {
      userPassword = passwordField.value;
      passwordError.style.display = "none";
    } else {
      passwordError.style.display = "inline";
    }
    userPasswordStore = passwordField.value;
  });

  // signUptheForm.addEventListener("click", function (e) {
  //   e.preventDefault();
  //   let isValid = true;

  //   if (userFirstName.value.length <= 2) {
  //     firstNameError.style.display = "inline";
  //     isValid = false;
  //   } else {
  //     firstNameError.style.display = "none";
  //   }
  //   if (userSurName.value.length <= 2) {
  //     surNameError.style.display = "inline";
  //     isValid = false;
  //   } else {
  //     surNameError.style.display = "none";
  //   }
  //   if (isValid) {
  //     alert("Account Created Successfully");
  //   }
  // });
});

window.onpopstate = function (event) {
  if (!event.state) {
    formContainer.innerHTML = loginHtml;
    return;
  }
  const page = event.state.page;
  if (page === "signup") {
    formContainer.innerHTML = createNewAccountHtml;
    return;
  }
  if (page === "login") {
    formContainer.innerHTML = logInNewPage;
    return;
  }

  formContainer.innerHTML = loginHtml;
};
