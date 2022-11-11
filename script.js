//Open Weather API Key
var APIKey = "4b15e9c838f839b2de2a4b338f140576";
var city = document.getElementById('searchCity');
var testCity = "denver"
var callTestURL = "http://api.openweathermap.org/data/2.5/weather?q=" + testCity + "&appid=" + APIKey;

function getCityweather() {
    fetch(callTestURL)
    .then(function (reponse) {
        return reponse.json();
    })
    .then(function (data) {
        console.log(data)
        var coord = data.coord;
        })
}

function forecast(coord) {
    var lat = coord.lat
    var lon = coord.lon
    
}

getCityweather();