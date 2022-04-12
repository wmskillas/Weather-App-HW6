var searchBtn = $('.searchBtn');

var apiKey = "5520d3e2e17a442c43730b6e39f79be3";

for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);
    var place = $(".list-forecast").addClass("list-group-item");
    place.append("<li>" + city + "</li>")
}

var storage = 0;

searchBtn.click(function () {
    var searchBar = $(".searchBar").val();

    var currentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + searchBar + "&Appid=" + apiKey + "&units=imperial";

    var fiveDays = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchBar + "&Appid=" + apiKey + "&units=imperial";

    console.log(currentDay);
    console.log(fiveDays);

    if (searchBar == "") {
        console.log(searchBar);
    } 
    else {
        $.ajax({
            url: currentDay,
            method: "GET"
        })

        .then(function (response) {
            var place = $(".list-forecast").addClass("list-group-item");
            place.append("<li>" + response.name + "</li>");

            var currentDayCard = $(".currentCard").append("<div>").addClass("card-body");
            currentDayCard.empty();

            var currentPlace = currentDayCard.append("<p>");
            currentDayCard.append(currentPlace);

            var time = new Date(response.dt * 1000);
            currentPlace.append(response.name + " " + time.toLocaleDateString("en-US"));
            currentPlace.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);

            var currentWeather = currentPlace.append("<p>");
            currentPlace.append(currentTemp);

            currentWeather.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            currentWeather.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            currentWeather.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
            console.log(currentWeather);

});

// $.ajax({
//     url: currentDay,
//     method: "GET"
// }).then(function (response) {
//     var day = [0]
//     var dayOne = $(".dayOne").addClass("card-text");
//     dayOne.empty();
//     day.forEach(function (i) {
//         var theOneDay = new Date(response.list[i].dt * 1000);
//         theOneDay = theOneDay.toLocaleDateString("en-US");
    //     dayOne.append("<div class=fiveDayColor>" + "<p>" + theOneDay + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
    //     console.log(dayOne);

    // })


$.ajax({
    url: fiveDays,
    method: "GET"
}).then(function (response) {
    var days = [0, 8, 16, 24, 32];
    var fiveDayList = $(".fiveDayOne").addClass("card-text");
    fiveDayList.empty();
    days.forEach(function (i) {
        var FiveDayTime = new Date(response.list[i].dt * 1000);
        FiveDayTime = FiveDayTime.toLocaleDateString("en-US");
        fiveDayList.append("<div class=fiveDayColor>" + "<p>" + FiveDayTime + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");

    })
        });
    } 
    
});