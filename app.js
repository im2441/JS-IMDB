$(document).ready(function() {
	 //set an event listener to the go button

	 $('.go').click(function(){
		//grab the search term from the search text input 	
		var value = $(".search").val();
		
	 	//call the new search function with the term as a parameter
	 	search(value);
	 	
	 })
});

var search = function(value){
	var arr = value.split(" ");
	if(arr.length != 1){
		var text = "";
		for(var i=0; i<arr.length-1; i++){
			text += "+" + arr[i];
		}
		text += "+" + arr[arr.length-1] + "+";
		$.ajax({
			url: "http://www.omdbapi.com/?t=" + text + "&y=&plot=full&r=json",
			method: "GET"
		})
		.done(render);
	} else {
		$.ajax({
			url: "http://www.omdbapi.com/?t=" + value + "&y=&plot=full&r=json",
			method: "GET"
		})
		.done(render);
	}
}

var render = function(response){
	var result = $(".result");
	result.empty();

	var h1 = $("<h1>");
	var h2 = $("<h2>");
	var p1 = $("<p>");
	var p2 = $("<p>");
	var p3 = $("<p>");


	if(response.Awards){
		h1.text("*" + response.Title);
		$(".result").append(h1);
	}
	else {
		h1.text(response.Title);
		$(".result").append(h1);
	}

	
	h2.text(response.Year);
	$(".result").append(h2);

	p1.text("Director: " + response.Director);
	$(".result").append(p1);

	p2.text("Actors: " + response.Actors);
	$(".result").append(p2);

	p3.text(response.Plot);
	$(".result").append(p3);

}
//function, search(term)
//make an ajax call to the omdb api using the search term.
//on done, call the render function

//function, render(response)
//render the response to the wrapper

//first, clear out the contents of the wrapper
//use the reponse object to create the following content
//h1, set the contents to the movie title
//append to the result

//h2, set the contents to the movie year
//append to the result

//paragraph, set contents to "Director: " + the directors name
//append to the result

//paragraph, set contents to "Actors: " + the directions name
//append to the result

//paragraph, set contentes to the plot

//Bonuse, if the movie received an award, put a start next to the title.