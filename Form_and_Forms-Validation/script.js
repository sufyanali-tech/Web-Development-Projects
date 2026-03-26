let formContainer = document.querySelector(".form-container");
let createNewAccount = document.querySelector("#create-account-button");

createNewAccount.addEventListener(
    "click",
    function() {

        formContainer.innerHTML = `
        <input type="text" class="input-fields" placeholder="First name" />
        <input type="text" class="input-fields" placeholder="Last name" />
        <small>Select date of birth</small>
        <input type="date" />
        <small>Select Gender</small>
        <input type="radio" name="gender-check" value="male" /> Male
        <input type="radio" name="gender-check" value="female" /> Female
        <small>Email</small>
        <input type="email" class="input-fields" placeholder="Email address or phone number" />
        <small>Password</small>
        <input type="password" class="input-fields" placeholder="password" />
        <button type="submit">Login</button>
        `
        formContainer.classList.add(".newPage");
        
    }
)