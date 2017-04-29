/*global $*/
var user = {};
var jokes = ["What do you call a broken pencil? Pointless!", "Knock Knock. 'Why did you knock?'. 'Theodore'. 'What?'. 'Theodore wasnt open so I knocked'."];
var questionState = "name";


$("#userInput").on('change', function(e) {
    var input = e.target.value;

    switch (questionState) {
        case "name":
            user.name = input;
            $("#question").addClass("animated fadeInRightBig");
            changeText("How are you feeling today " + user.name +  ", good or bad?");
            questionState = "mood";
            break;
        case "mood":
            if (input === "good") {
                user.mood = "good";
                $("#question").addClass("animated fadeInRightBig");
                changeText("Thats great. Keep at it " + user.name);
                $("#output").html("<img class='img-fluid' id='goodImage' src='http://pix.iemoji.com/images/emoji/apple/ios-9/256/thumbs-up-sign.png' />");
                questionState = "weather";
            }
            else if (input === "bad") {
                user.mood = "bad";
                changeText("Thats too bad. Here is a joke " + user.name);
                var random = Math.floor(Math.random() * jokes.length);
                $("#output").html(jokes[random]);
                questionState = "weather";
            }
            break;
        case "weather":
            getWeather();
            questionState = "done";
            break;
    }
    if(input == "thanks"){
        $("#question").html("No problem " + user.name + " :D");
    }
    else if(input == "no problem"){
        $("#question").html("Anytime " + user.name + " :D");
    }
    else if(input == "whats my name"){
        $("#question").html("Your name is " + user.name);
    }    
    else if(input.includes("weather")){
        getWeather();
    }   
});

function changeText(prompt) {
    $("#question").html(prompt);
    $("#userInput").val("");
}


var demoUser = {
    "location": "New York City",
    "Name": "Henry",
    "age": "18",
    "summer_outfit": {
        "description": "summer causal",
        "image": "https://s-media-cache-ak0.pinimg.com/736x/e7/b5/cc/e7b5cc7e115f784dc20ad23fcb5985be.jpg"
    }
};

function printWeather(response) {
    var temp = response.main.temp_max;
    var image = demoUser.summer_outfit.image;
    var currentlocation = response.name;
    var current = response.weather[0].main;
    var imageElement = $('<img>', {
        src: image,
        id: "outfit"
    });
    $('#output').empty();
    $('#output').append("Todays weather for " + currentlocation + " is " + current + " with a high of " + temp + ". I recommend this outfit for today.", imageElement);
}

function getWeather() {
    var url = 'http://api.openweathermap.org/data/2.5/weather' +
        '?appid=c2f2d170f6f6fc336058e9851edb828c' +
        '&q=' + demoUser.location +
        '&units=imperial';
        $("body").css("background-image", "background-image")
    $.get(url, printWeather);
}
