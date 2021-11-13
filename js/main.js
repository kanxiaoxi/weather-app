const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
    if (evt.keyCode === 13) {
        searchbox.value ? getResults(searchbox.value) : alert("Please enter a city");
    }
}
async function getResults(city) {
    // 本地调试url
    // const url = `http://localhost:9000/fetchweather?q=${city}`;
    // 线上url
    const url = `/.netlify/functions/fetchweather?q=${city}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.cod === "404") {
                alert("City not found");
                throw new Error("City not found");
            }
            displayResults(data);
        })
        .catch((err) => console.log(err));
}

function displayResults(weather) {
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
        weather.main.temp_max
    )}°C`;
}
function dateBuilder(d) {
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
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
