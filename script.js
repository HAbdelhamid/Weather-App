let weather = {
    "apikey" : "aa6ea7a3eeda3e7c60100876ca4892ca" ,
    fetchWeather : function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid="+ this.apikey +"")
        .then((Response) => Response.json())
        .then((data) => this.displayWeather(data))
    },
    

};