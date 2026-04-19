let formContainer = document.querySelector(".form-container");
let createNewAccount = document.querySelector("#create-Newaccount");

let loginHtml = formContainer.innerHTML;

let signUpEmailStore = null;
let signUpPasswordStore = null;
let logInEmailStore = null;
let logInPasswordStore = null;
let logInNewPage = "null";
let createNewAccountHtml = "null";
let accountCreated = null;

let firstNameTrue = null;
let surNameTrue = null;
let emailTrue = null;
let passwordTrue = null;

let logInEmail = document.querySelector("#loginemail");
let logInPassword = document.querySelector("#loginpassword");
let logIn = document.querySelector("#login");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;
// Document of Create new Account
formContainer.addEventListener("input", function (e) {

  if (e.target.id === "loginemail") {

    logInEmailStore = e.target.value
  }

  let firstNameError = document.querySelector("#firstNameErorr");
  let surNameError = document.querySelector("#SurNameErorr");

  if (e.target.id === "loginpassword") {

    logInPasswordStore = e.target.value
  }
  if (e.target.id === "userFirstName" || e.target.id === "userSurName") {

    if (e.target.value.length === 0 || e.target.value.length > 2) {
      firstNameError.style.display = "none";
      firstNameTrue = true
      surNameTrue = true
    }
    else {
      firstNameError.style.display = "inline";
      firstNameTrue = false
      surNameTrue = false
    }
  }
  if (e.target.id === "email") {
    if (e.target.value.length === 0 || emailRegex.test(e.target.value)) {
      emailError.style.display = "none";
      emailTrue = true
    } else {
      emailError.style.display = "inline";
      emailTrue = false
    }
    signUpEmailStore = e.target.value;
  }
  if (e.target.id === "password") {

    if (e.target.value.length === 0 || passwordRegex.test(e.target.value)) {

      passwordError.style.display = "none";
      passwordTrue = true
    }
    else {
      passwordError.style.display = "inline";
      passwordTrue = false
    }
    signUpPasswordStore = e.target.value;
  }
});

formContainer.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.id === "login") {
    let emailandPasswordError = document.querySelector("#emailandpasswordError")

    if (signUpEmailStore !== logInEmailStore || signUpPasswordStore !== logInPasswordStore) {

      emailandPasswordError.style.display = "inline"
      return
    }
    if (logInEmailStore === null || logInPasswordStore === null) {

      emailandPasswordError.style.display = "inline"
      return
    }
    if (signUpEmailStore === null || signUpPasswordStore === null) {

      emailandPasswordError.style.display = "inline"
      return
    }
    if (signUpEmailStore === logInEmailStore && signUpPasswordStore === logInPasswordStore) {

      history.pushState({ page: "login" }, "", "/login");

      logInNewPage = formContainer.innerHTML = `
    <div id="loginsuccessful">
      <h1>Login Successful ✔</h1>
    </div>
    `;
    }
  }
  if (e.target.id === "create-Newaccount") {

    history.pushState({ page: "signup" }, "", "/signup");

    createNewAccountHtml = formContainer.innerHTML = `
       <div class="create-newAccount">
        <h3>Enter your personal infomation</h3>
        <form class="new-accoutn-form">

          <div id="name-container">
            <small>Name</small>
              <div id="InputFields">
                <div class="name-field">
                  <input type="text" id="userFirstName" class="userName" placeholder="First name"/>
                  <small id="firstNameErorr">character should be more than 2</small>
                </div>

                <div class="name-field">
                  <input type="text" id="userSurName" class="userSurname" placeholder="Surname"/>
                  <small id="SurNameErorr">character should be more than 2</small>
                </div>
              </div>
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
              <small id="emailError">Please enter a valid mobile number or email address.</small>
              <small>Password</small>
              <input type="password" id="password" placeholder="Password"/>
              <small id="passwordError">Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &).</small> 
            </div>
          <div class="signup-button">
            <a href="#" id="signup-form">Create account</a>
          </div>
        </form>
      </div>`;

    let userFirstName = document.querySelector("#userFirstName");
    let userSurName = document.querySelector("#userSurName");

    let emailField = document.querySelector("#email");
    let passwordField = document.querySelector("#password");
    let emailError = document.querySelector("#emailError");
    let passwordError = document.querySelector("#passwordError");


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
    for (let y = currentYear; y > 1950; y--) {
      let option = document.createElement("option");
      option.value = y;
      option.textContent = y;
      yearSelection.appendChild(option);
    }
  }
  if (e.target.id === "signup-form") {

    if ((firstNameTrue && surNameTrue) && (emailTrue && passwordTrue)) {

      history.pushState({ page: "accountcreated" }, "", "/accountcreated")

      accountCreated = formContainer.innerHTML = `
      <div id="accountCreated-container"> 
        <div id="accountCreated"> 
          <h1> Account Created Successfully ✔</h1> 
          <a href="#" id="back-to-home">Back to login</a>
        </div>
      </div>
      `
    }
  }
  if (e.target.id === "back-to-home") {

    history.replaceState({ page: "home" }, "", "/");
    formContainer.innerHTML = loginHtml
  }
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
  if (page === "accountcreated") {

    formContainer.innerHTML = accountCreated
  }
};