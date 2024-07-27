document.addEventListener('DOMContentLoaded', () => {  //this represent the code will execurte after the full loading of full script

    //target the elements from the document and store them in variables 
    const movieList = document.getElementById('movieList');
    const sortMovies = document.getElementById('sortMovies');
    const filterYear = document.querySelector('.filterYear');
    const filterButton = document.querySelector('.filter');

    let movies = []; // empty movies array

    fetch('http://localhost:3000/movies') // fetch data from the json api
      .then(resp => resp.json()) //convert it in json format 
      .then(data => {
        movies = data;
        displayMovies(movies); //pass data to displayMovies function which will create new element to display the data
      });

    
    function displayMovies(movies) { //display movies fuction takes the movies data which is comve from the fetch method 
      movieList.innerHTML = '';      //firt it sets the movie list to empty
      movies.forEach(movie => {         //on meovies apply forEach method to extract data and create new movie cards
        const newMovie = document.createElement('div');  //in newMovie we create the new div element 
        newMovie.classList.add('movie-card');             // in div we will add the card
        newMovie.innerHTML = `                              
          <img src="${movie.image}" alt="${movie.title}" />
          <h2>${movie.title}</h2>
          <p>Release Year: ${movie.releaseYear}</p>
          <p>IMDb Rating: ${movie.imdbRating}</p>
        `;                                              //in card element we make the display of card 
        movieList.appendChild(newMovie);                //and append this into the movieList 
      });
    }


    // filter movies based on the release year
    filterButton.addEventListener('click', (e) => {   
        e.preventDefault();                             //prevent default behaviour
        const year = parseInt(filterYear.value);   //parseInt method convert strng into the nteger
        filterMoviesByYear(year);
    });
    
    function filterMoviesByYear(year) {     // this function apply filter method on movies and filter it on the basis of release year
        const filteredMovies = movies.filter(movie => movie.releaseYear > year);
        displayMovies(filteredMovies);
    }

    //sort the movies based on ascending and descening criteria
    sortMovies.addEventListener('change', function() {
        // Split the dropdown value into an array
        const sortValue = sortMovies.value.split('-');
        const attribute = sortValue[0]; // first element property on the bsis we want to sort
        const order = sortValue[1];     // second element order asc or desc 
    
        
        sortMoviesByRating(attribute, order);
    });
    function sortMoviesByRating(attribute, order) {
        movies.sort(function(a, b) {                //a,b are like objects which compares the attribute vlues
            if (order === 'asc') {
                return a[attribute] - b[attribute]; // Ascending order
            } else {
                return b[attribute] - a[attribute]; // Descending order
            }
        });
        displayMovies(movies);
    }
    
    
  });