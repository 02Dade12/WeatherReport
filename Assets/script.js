$(document).ready(function () {

    //Clears all local storage items and previous searches from the page.
    $(".clear").on("click", function () {
        localStorage.clear();
        $("#history").remove();
    });


    $("#searchBtn").on("click", function () {
        var citySearched = $("#searchInput").val().trim();
    });

    // AJAX Call

    var city = "Orlando";
    var API_KEY = "b2a7361f2d32eb5699ee502bb4d55d43";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        var city = response.name;
        console.log(city);
    });

});