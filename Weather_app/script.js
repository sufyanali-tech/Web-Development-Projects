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
  const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${API_KEY}&units=metric`;
  const respone = await fetch(currentWeather)
  
  const data = await respone.json()

  console.log(data);
  // console.log(data.name);

  document.querySelector("#city").textContent = data.name
  document.querySelector("#country").textContent = data.sys.country
  document.querySelector("#temperature").textContent = data.main.temp
  document.querySelector("#weather-status").textContent = data.weather[0].main
  document.querySelector("#feels-like").textContent = data.main.feels_like
  document.querySelector("#humidity").textContent = data.main.humidity
  document.querySelector("#wind-speed").textContent = data.wind.speed

  const forecastWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=${API_KEY}&units=metric`;

  const iconCode = data.weather[0].icon
  const iconUrl= `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.querySelector("#weather-img").src = iconUrl
  
})

