//$(document).ready(function () {

    var citArr = [];

    //Clears all local storage items and previous searches from the page.
    $(".clear").on("click", function () {
        localStorage.clear();
        $("#history").remove();
        $("#searchInput").val("");
    });

    $(".searchBtn").on("click", function () {

        var citySearched = $('#searchInput').val().trim();

        localStorage.setItem("city", citySearched);

        var API_KEY = "b2a7361f2d32eb5699ee502bb4d55d43";
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "&appid=" + API_KEY;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {

            var city = response.name;
            var kTemp = response.main.temp;
            var fTemp = Math.floor(((kTemp - 273.15) * 1.8) + 32);
            var humidityNow = response.main.humidity;
            var windSpeednow = response.wind.speed;
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            $("#currentCity").text(city);
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

    });
//});







