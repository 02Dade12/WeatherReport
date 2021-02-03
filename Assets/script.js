$(document).ready( function() {

    //Clears all local storage items and previous searches from the page.
    $(".clear").on("click", function () {
        localStorage.clear();
        $("#history").remove();
        $("#searchInput").val("");
    });

    function save (newCity){
        var cityArr = JSON.parse(localStorage.getItem("cityArray")) || [];
        cityArr.push(newCity);
        localStorage.setItem("cityArray", JSON.stringify(cityArr));
    }

    function renderCityBtn (){
        var cityArr = JSON.parse(localStorage.getItem("cityArray")) || [];
        
        $("#history").empty();

        cityArr.forEach(citytext => {
            console.log(citytext);
            var li = $("<li>");
            var button = $("<button>");
            button.addClass("btn btn-primary history-btn").text(citytext);
            li.append(button)
            $("#history").append(li);
        });
    };

    renderCityBtn();

    $(".history-btn").on("click", function() {
        var citytext = $(this).text();
        searchWeather(citytext);
    });

    $(".searchBtn").on("click", function () {
        var citySearched = $('#searchInput').val().trim();
        searchWeather(citySearched);
        save(citySearched);
        renderCityBtn();
    });

    function searchWeather(city) {

        var API_KEY = "b2a7361f2d32eb5699ee502bb4d55d43";
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {

            var cityName = response.name;
            var kTemp = response.main.temp;
            var fTemp = Math.floor(((kTemp - 273.15) * 1.8) + 32);
            var humidityNow = response.main.humidity;
            var windSpeednow = response.wind.speed;
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            $("#currentCity").text(cityName);
            $("#temp").text("Temperature: " + fTemp);
            $("#humidity").text("Humidity " + humidityNow);
            $("#windSpeed").text("Wind Speed " + windSpeednow + " MPH");

            uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?&appid=b2a7361f2d32eb5699ee502bb4d55d43&lat=" + lat + "&lon=" + lon;
           
            $.ajax({
                url: uvQueryURL,
                method: "GET",
            }).then(function (uvResponse) {
                $("#uvIndex").text("UV Index: " + uvResponse[0].value);
            })
            
        })

    };
});









