let dateAndTime = document.querySelector("#date-and-time");

const now = new Date();

const day = now.toLocaleDateString("en-US", { weekday: "long" });
const date = now.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric"
});
const time = now.toLocaleTimeString("en-US",{
    hour:"2-digit",
    minute : "2-digit",
    timeZone: "Asia/Karachi"
})


dateAndTime.textContent = `${day} | ${date} | ${time}`;


