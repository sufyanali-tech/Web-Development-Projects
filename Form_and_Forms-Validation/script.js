let createAccount = document.querySelector("#create-account");

createAccount.addEventListener(
    "click",
    function(detail) {

        detail.preventDefault();
        let h3 = document.querySelector(".form-title")
        let loginForHidden = document.querySelector(".login-form")

        h3.style.display = "none"
        loginForHidden.style.display = "none"; 

        
    }
)