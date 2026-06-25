let input = document.querySelector("#operend-one");
let output = document.querySelector("#output");
let buttons = document.querySelectorAll("button");

let userInputStoring1 = "";
let userInputStoring2 = null;
let userInputStoringTemporery = "";
let operatorStoring = "";

buttons.forEach(function (btn) {

  btn.addEventListener("click", function () {
    if (["+", "-", "x", "÷", "mod"].includes(btn.textContent)) {

      if (userInputStoring2) {

        userInputStoringTemporery = userInputStoring2;
        userInputStoring2 = null;
        userInputStoring1 = "";
        input.textContent = "0";
      }
      else {
        userInputStoringTemporery = userInputStoring1;
        userInputStoring1 = "";
        input.textContent = "0";
      }
      if (btn.textContent === "+") {

        operatorStoring = btn.textContent;
      }
      else if (btn.textContent === "-") {
        operatorStoring = btn.textContent;
      }
      else if (btn.textContent === "x") {
        operatorStoring = btn.textContent;
      }
      else if (btn.textContent === "÷") {
        operatorStoring = btn.textContent;
      }
      else if (btn.textContent === "mod") {
        operatorStoring = btn.textContent;
      }
      else {
        operatorStoring = btn.textContent;
      }
    } 
    else if (btn.textContent === "AC") {

      userInputStoring1 = "";
      userInputStoring2 = null;
      input.textContent = "0";
      output.textContent = "0";
    }
    else if (btn.textContent === "=") {

      if (userInputStoringTemporery && operatorStoring === "+") {

        userInputStoring2 = parseFloat(userInputStoringTemporery) + parseFloat(userInputStoring1);
        output.textContent = userInputStoring2;

      }
      else if (userInputStoringTemporery && operatorStoring === "-") {

        userInputStoring2 = parseFloat(userInputStoringTemporery) - parseFloat(userInputStoring1);
        output.textContent = userInputStoring2;

      }
      else if (userInputStoringTemporery && operatorStoring === "x") {

        userInputStoring2 = parseFloat(userInputStoringTemporery) * parseFloat(userInputStoring1);
        output.textContent = userInputStoring2;

      }
      else if (userInputStoringTemporery && operatorStoring === "÷") {

        userInputStoring2 = parseFloat(userInputStoringTemporery) / parseFloat(userInputStoring1);
        output.textContent = userInputStoring2;

      }
      else if (userInputStoringTemporery && operatorStoring === "mod") {

        userInputStoring2 = parseFloat(userInputStoringTemporery) % parseFloat(userInputStoring1);
        output.textContent = userInputStoring2;
      }
    }
    else if (btn.textContent === "del") {

      if (userInputStoring1 !== "") {

        userInputStoring1 = userInputStoring1.slice(0, -1);
        input.textContent = userInputStoring1;

        if (userInputStoring1 === "") {

          input.textContent = "0";
        }
      }
    }
    else {

      userInputStoring1 += btn.textContent;
      input.textContent = userInputStoring1;
    }
  });
});
