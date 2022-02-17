let weather = {
    "apikey" : "aa6ea7a3eeda3e7c60100876ca4892ca" ,
    fetchWeather : function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid="+ this.apikey +"")
        .then((Response) => Response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { description, icon } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        $("h2").text("Weather in " + name);
        $(".temp").text(temp + " °C");
        $(".icon").attr("src", `https://openweathermap.org/img/wn/${icon}.png`);
        $(".description").text(description);
        $(".humidity").text("humidity : " + humidity +"%");
        $(".wind").text("Wind speed : " + speed +" km/h");
        $(".Weather").removeClass("loading");
        $('body').css('background-image', 'url("https://source.unsplash.com/1600x900/?' + name +' ")');
    },
    search: function () {
        this.fetchWeather($(".search-bar").val());
    }
};

$(".search button").click(function () {
    weather.search();
})

.keyup()
$(".search-bar").keyup(function (event) {
    if (event.key == "Enter"){
        weather.search();
    }
})

const findMyCity = async (position) => {
    const laltitude = position.coords.laltitude;
    const longitude = position.coords.longitude;
    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${laltitude}&longitude=${longitude}&localityLanguage=en`
   
    const response = await fetch(geoApiUrl);
    const data = await response.json();
    return data.city;
    
}

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
  
async function success(pos) {
    var crd = pos.coords;
    let city = await findMyCity(pos);
    weather.fetchWeather(city);

}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);


