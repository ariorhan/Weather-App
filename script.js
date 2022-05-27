let weather = {
    apiKey: "1f5bb36e23084557d79972ffc49bbd62",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
        )
            .then((response) =>   {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json(); 
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description} = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { sunrise, sunset } = data.sys;        
        const timezone = 60
        const timezoneInMinutes = timezone / 60;
        const currentTime = moment().utcOffset(timezoneInMinutes).format('lll');
        console.log("current " + currentTime)
        const localSunrise = moment
            .unix(sunrise)
            .utcOffset(timezoneInMinutes)
            .format('LT');
        const localSunset = moment
            .unix(sunset)
            .utcOffset(timezoneInMinutes)
            .format('LT');
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = temp.toFixed(1) + " °C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".rise").innerText = localSunrise;
        document.querySelector(".set").innerText = localSunset;
        document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + description + "')"
    },
    search: function () { 
        this.fetchWeather(document.querySelector(".search").value);
    },
};

document.querySelector(".btn").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search").addEventListener("keyup", function(event)  {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("London");