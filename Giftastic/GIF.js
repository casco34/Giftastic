$(document).ready(function() {
    //  array of animals
       var animals = ["lion", "leopard", "jaguar", "tiger", "cheetah","eagle"];
    
       createButtons();
    // creates buttons
    function createButtons () {
    
      $("#giphyButtons").html('');
    
     for (i = 0; i < animals.length; i++) {
      
       var b = $("<button>");
       b.addClass("animals");
       b.attr("data-name",animals[i]);
       b.text(animals[i]);
      $("#giphyButtons").append(b);
     }
    }
  
 
  function displayAnimal() {
  
     var animal = $(this).attr("data-name");
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
      
         $.ajax({
             url: queryURL,
             method: "GET"
           }).done(function(response){
          
          var animalDiv = $("<div>").addClass("animal");
          var rating = response.rating;
          var p = $("<p>").text('Rating: ' + rating).addClass("ratings");
          $("#imageGif").append(animalDiv);
           
           })
         }
  

   $("#addAnimal").on("click", function(event) {
     event.preventDefault();
    
     var newAnimal = $('#animalInput').val().trim().toLowerCase();
    
     animals.push(newAnimal);
     
     createButtons();
   })
     
     
     $("html").on('click', "button", function() {
      
      
       var animal = $(this).attr("data-name");
  
       // Constructs a queryURL using the animal name
       var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        
       // Perfors an AJAX request with the queryURL
       $.ajax({
           url: queryURL,
           method: "GET"
         })
         // After data comes back from the request
         .done(function(response) {
           $("#imageGif").html('');
           
           // stores the data from the AJAX request in the results variable
           var results = response.data;
  
           // Looping through each result item
           for (var i = 0; i < results.length; i++) {
               // Creating and storing a div tag
               var animalDiv = $("<div>");
  
               // Creates a paragraph tag with the result item's rating
               var p = $("<p>").text("Rating: " + results[i].rating);
  
               // Creates and stores an image tag
               var animalImage = $("<img>");
               //this adds the class animals to all images
               animalImage.addClass('gif',animals);
               // Setts the src attribute of the image to a property pulled off the result item
               animalImage.attr("data-state='still'" );
               animalImage.attr("src", results[i].images.fixed_height.url);
               animalImage.attr("src", results[i].images.fixed_height_still.url);
  
               // Appends the paragraph and image tag to the animalDiv
               animalDiv.append(p);
               animalDiv.append(animalImage);
  
               // appends the animalDiv to the HTML page in the div
               $("#imageGif").append(animalDiv);
  
              }
          })
      });
  
      
        // this onclick  changes an image from static to dynamic
     $(document).on('click', '.gif', function() {
        if(this.src.split('_').length === 2) {
          $(this).attr('src', this.src.split('_').splice(0, 1) + '.gif');
        } else {
          $(this).attr('src', this.src.replace('.gif', '_s.gif'));
        }
      });
  
    });