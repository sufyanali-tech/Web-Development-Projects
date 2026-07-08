let allIcons = document.querySelectorAll(".icons");

allIcons.forEach((btn) => {

    btn.addEventListener("click", () => {

        allIcons.forEach(icon => icon.classList.remove("active"))
        btn.classList.add("active")
    })
})

let message = document.querySelector("#")