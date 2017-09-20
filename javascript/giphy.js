$( document ).ready(function() {

var animals = ['dog', 'cat', 'lion', 'owl', 'beaver', 'buffalo', 'butterfly']

function displayAnimal() {

  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13";

// creating an ajax call for the specific city button being clicked
$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
   console.log(response.data);
//for loop 사용해서 해야돼
//  var animalDiv = $("<div class='animaleya'>");
//  var animal = $(this).attr("data-name"); //not working, undefined name of animal.
//  var name = response.data[0].animal;
//  var nameTextOne = $("<p>").text("Hello " + name);

//  animalDiv.append(nameTextOne);
  var result = response.data;
  for(var i=0; i < result.length; i++){
  $("#animals").prepend('<img class="gif" src="' + response.data[i].images.fixed_height_still.url + '">');
  //var imgURL = response.data[i].images.fixed_height.url;
  //var imgURLstill = response.data[i].images.fixed_height_still.url;
  //var animalImage = $("<img>");
  //var image = $("<img>").attr("src", imgURL);
  //var imageStill = $("<img>").attr("src", imgURLstill);
  //animalDiv.append(image);
  //$("#animals").append(image);
  //$("#animals").append(imageStill);

}
});
//'http://api.giphy.com/v1/gifs/search?limit=100&api_key=dc6zaTOxFJmzC'
} //display animal function

function renderButtons() {
  $("#A").empty();
  for (var i=0; i < animals.length; i++) {
    var a = $("<button>");
    a.addClass("animal_a");
    a.attr("data-name", animals[i]);
    a.text(animals[i]);
    $("#A").append(a);

  }
}

$("#add-name").on('click', function(event){
  event.preventDefault();
  var animal = $("#name-input").val().trim();

  animals.push(animal);
  renderButtons();
});

$('body').on('click', '.gif', function() {
    var src = $(this).attr("src");
    if($(this).hasClass('playing')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('playing');
  } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});

//$("#add-name").on('click', '.city', displayCity);
//$(document).on("click", ".animal_a" , displayAnimal);
$(document).on("click", ".animal_a" , displayAnimal);
renderButtons();


});
