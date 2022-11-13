//Open Weather API Key & forecast URL
var APIKey = "4b15e9c838f839b2de2a4b338f140576";
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
function forecast (lat, lon) {    
    var foreApi = callURLfive + "lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly" + "&units=imperial" + "&appid=" + APIKey;
   console.log(foreApi)
    fetch(foreApi)
    .then(function (response) {
        return response.json()
})
    .then(function (forecastData) {
        console.log(forecastData)
        for (var i = 1; i < 6; i++) {
            //day js to add in dates
            $("#date1").text(dayjs().add(1, "day").format('MM-DD-YY'));
            $("#date2").text(dayjs().add(2, "day").format('MM-DD-YY'));
            $("#date3").text(dayjs().add(3, "day").format('MM-DD-YY'));
            $("#date4").text(dayjs().add(4, "day").format('MM-DD-YY'));
            $("#date5").text(dayjs().add(5, "day").format('MM-DD-YY'));
            var iconCodes = "http://openweathermap.org/img/wn/" + forecastData.daily[i].weather[0].icon + "@2x.png";
            $("#icon" + i).attr("src", iconCodes);
            var foreTemp = forecastData.daily[i].temp.day;            
            $("#temp" + i).html(foreTemp + "&#8457");
            var foreWind = forecastData.daily[i].wind_speed;
            $("#wind" + i).html(foreWind + " MPH");
            var foreHumid = forecastData.daily[i].humidity;
            $("#humid" + i).html(foreHumid + "%")

        }

    })
}       

//Create list button for saved cities to display on page
var newBtn = function (btnName) {
    var button = $("<li>")
    .text(btnName)
    .addClass("d-grid gap-2 col-12 mx-auto btn btn-secondary")
    .attr("type", "submit")
    return button;
}

//get searched cities from local storage and display in search history
function getSavedCities() {    
        var cityListArray = JSON.parse(localStorage.getItem("searchedCity"))
        console.log(cityListArray)
        if (cityListArray == null) {
            cityListArray = [];
        } else {
            for (let i = 0; i < cityListArray.length; i++) {
                 var entry = newBtn(cityListArray[i]); 
                 $("#searchHistory").append(entry)
        }
    }
    }
getSavedCities()





