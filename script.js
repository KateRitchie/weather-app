//Open Weather API Key
var APIKey = "4b15e9c838f839b2de2a4b338f140576";
var testCity = "denver"
var callTestURL1 = "http://api.openweathermap.org/data/2.5/weather?q=" + testCity + "&units=imperial" + "&appid=" + APIKey;
var callURLfive = "https://api.openweathermap.org/data/3.0/onecall?"

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
    getCityweather(city);
})

//Function to get current day weather and populate current day card
function getCityweather(city) { 
    var callUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;
    fetch(callUrl)
    .then(function (reponse) {
        return reponse.json();
    })
    .then(function (data) {
        console.log(data)
        $("#currentCity").html(city)
        $("#currentday").text(dayjs().format('MMM D, YYYY'))
        var iconCodeCur = data.weather[0].icon;
        console.log(data.weather[0].icon)
        var iconCode = "http://openweathermap.org/img/wn/" + iconCodeCur + "@2x.png";
        $("#currentIcon").attr("src", iconCode);
        $("#currentTemp").html(data.main.temp + "&#8457");
        $("#currentWind").html(data.wind.speed + " MPH");
        $("#currentHumid").html(data.main.humidity + "%");
        var lat = data.coord.lat
        var lon = data.coord.lon
        console.log(lat)
        console.log(lon)
        forecast(lat, lon)
        })   
    }
//Function to get forecase weather and populate forecast cards
var forecast = function(lat, lon) {    
    var foreApi = callURLfive + "lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly" + "&units=imperial" + "&appid=" + APIKey;
   console.log(foreApi)
    fetch(foreApi)
    .then(function (response) {
        return response.json()
})
    .then(function (forecastData) {
        console.log(forecastData)
    })
}       


getCityweather(city);



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
//var cityHistory = $("<button>");

//Display searched cities
//function renderSearchedCity() {
   // for (let i = 0; i < cityListArray.length; i++) {
    //    var entry = cityListArray[i];
    //    newBtn = entry.city
        
   // }
//}




