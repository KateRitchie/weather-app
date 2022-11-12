//Open Weather API Key
var APIKey = "4b15e9c838f839b2de2a4b338f140576";
var city = $("#searchCity");
var testCity = "denver"
var callTestURL = "http://api.openweathermap.org/data/2.5/weather?q=" + testCity + "&units=imperial" + "&appid=" + APIKey;
var callTestURLfive = "https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=current,minutely,hourly&appid=665c74fe39e681e1c6915338d4927a4c"

//Function to get current day weather and populate current day card
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
//Function to get forecase weather and populate forecast cards
function forecast(coord) {
    //var lat = coord.lat
   // var lon = coord.lon
    fetch(callTestURLfive)
    .then(function (response) {
        return response.json()
})
    .then(function (forecastData) {
        console.log(forecastData)
    })
        
}

getCityweather();
forecast();

//Array for searched cities
var cityListArray = []
//Submit button event listener
var saveBtn = $("#saveBtn");
saveBtn.on("click", function(event) {
    event.preventDefault();
    var city = $("#searchCity").val();
    cityListArray.push(city);
    console.log(city)
    localStorage.setItem('searchedCity', JSON.stringify(cityListArray));   

})
//get searched cities from local storage
var savedCities = JSON.parse(localStorage.getItem("searchedCity"))
function getSavedCities() {
    if (savedCities.length !== null) {
        return cityListArray;
        } else {
           cityListArray = [];
        }
        return cityListArray
}

//Searched cities button creation
//var newBtn = function () {
  //  var btn = $("<button>")
    //.text(text)
    //.addClass("btn btn-primary d-grid gap-2 col-12 mx-auto")
    //.attr("type");
    //return btn;
//}

//Display searched cities
//function renderSearchedCity() {
   // for (let i = 0; i < cityListArray.length; i++) {
    //    var entry = cityListArray[i];
    //    newBtn = entry.city
        
   // }
//}




