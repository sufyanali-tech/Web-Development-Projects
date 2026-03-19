let email = document.querySelector("#email");
let password = document.querySelector("#password");
let form = document.querySelector("form");

form.addEventListener(
    "submit",
    function(someValue) {

        someValue.preventDefault();

        // console.log(email.value);
        document.querySelector("#emailError").textContent = "";
        document.querySelector("#passwordError").textContent = "";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        let emailTested = emailRegex.test(email.value);
        let passwordTested = passwordRegex.test(password.value);

        if(!emailTested) {
            document.querySelector("#emailError").textContent = "Email is incorrect";
            document.querySelector("#emailError").style.display = "initial"
        }
        if(!passwordTested) {
            document.querySelector("#passwordError").textContent = "Password is incorrect";
            document.querySelector("#passwordError").style.display = "initial"
        }
    }
)