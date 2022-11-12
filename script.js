//Open Weather API Key
var APIKey = "4b15e9c838f839b2de2a4b338f140576";
var city = $("#searchCity");
var testCity = "denver"
var callTestURL = "http://api.openweathermap.org/data/2.5/weather?q=" + testCity + "&units=imperial" + "&appid=" + APIKey;

function getCityweather() {
    fetch(callTestURL)
    .then(function (reponse) {
        return reponse.json();
    })
    .then(function (data) {
        console.log(data)
        var coord = data.coord;
        $("#currentday").text(dayjs().format('MMM D, YYYY'))
        var iconCodeCur = data.weather[0].icon;
        console.log(data.weather[0].icon)
        var iconCode = "http://openweathermap.org/img/wn/" + iconCodeCur + "@2x.png";
        console.log(iconCode)
        $("#currentIcon").attr("src", iconCode);
        $("#currentTemp").html(data.main.temp + "&#8457");
        $("#currentWind").html(data.wind.speed + " MPH");
        $("#currentHumid").html(data.main.humidity + "%");

        })
}

function forecast(coord) {
    var lat = coord.lat
    var lon = coord.lon
        
}

getCityweather();
