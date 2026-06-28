let dateAndTime = document.querySelector("#date-and-time");
let searctButton = document.querySelector("#button-field");
// let inputField = document.querySelector("#input-field");
const API_KEY = "b056132f26c17cf246d79aa1e89d7624";
const now = new Date();

const day = now.toLocaleDateString("en-US", { weekday: "long" });
const date = now.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const time = now.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Karachi",
});

dateAndTime.textContent = `${day} | ${date} | ${time}`;

searctButton.addEventListener("click",async function() {

  let userInput = document.querySelector("#input-field").value.trim()

  // console.log(userInput);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${API_KEY}&units=metric`;
  const respone = await fetch(url)
  
  const data = await respone.json()

  console.log(data);
  console.log(data.name);

  const iconCode = data.weather[0].icon
  const iconUrl= `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.querySelector("#weather-img").src = iconUrl
  
})

