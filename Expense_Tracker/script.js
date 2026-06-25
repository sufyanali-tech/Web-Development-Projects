let balance = document.querySelector("#balance");
let incomeAmount = document.querySelector("#income-amount");
let expenseAmount = document.querySelector("#expense-amount");
let form = document.querySelector("#transaction-form");
let descriptionField = document.querySelector("#description");
let amount = document.querySelector("#amount");
let transactionList = document.querySelector("#transaction-list");
let balanceMessage = document.querySelector(".balance-message");

let listContent = null;
let userAmount = null;
let incomeBalance = null;
let expenseBalance = null;
let storeUserIncomeBalance = 0

descriptionField.addEventListener("input", function (event) {
  // console.log(event.target.value);
  listContent = event.target.value;
});

amount.addEventListener("input", function (event) {
  userAmount = event.target.value;
});

form.addEventListener("submit", addAmount);

function addAmount(event) {
  event.preventDefault();

  let list = document.createElement("li");
  let span = document.createElement("span");

  list.textContent = listContent;
  userAmount = parseFloat(userAmount);
    storeUserIncomeBalance = incomeBalance
  incomeBalance += userAmount; // 10,10 -7,3 -4,-1

  if (userAmount > 0) {
    balance.textContent = `$${incomeBalance}.00`;
    incomeAmount.textContent = `$${incomeBalance}`;
    span.textContent = `+$${userAmount}`;

    list.appendChild(span);
    transactionList.appendChild(list);
      balanceMessage.style.display = "none";
  } else {
    if (incomeBalance < 0) {
      incomeBalance = storeUserIncomeBalance;
      balanceMessage.style.display = "inline";
    } else {
      expenseBalance -= userAmount;
      balance.textContent = `$${incomeBalance}.00`;
      expenseAmount.textContent = `$${expenseBalance}.00`;
      span.textContent = `$${userAmount}`;
    
      balanceMessage.style.display = "none";
      list.appendChild(span);
      transactionList.appendChild(list);
    }
  }

  form.reset();
}
