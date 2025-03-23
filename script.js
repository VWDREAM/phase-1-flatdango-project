// Select all necessary DOM elements
const poster = document.getElementById('poster');
const title = document.getElementById('title');
const runtime = document.getElementById('runtime');
const showtime = document.getElementById('showtime');
const tickets = document.getElementById('tickets');

function fetchFirstMovie() {
    fetch('http://localhost:3000/films/1')
      .then(response => response.json())
      .then(movie => {
        // Update the DOM
        document.getElementById('title').textContent = movie.title;
        document.getElementById('runtime').innerHTML = `<strong>Runtime:</strong> ${movie.runtime} minutes`;
        document.getElementById('poster').src = movie.poster;
        document.getElementById('film-info').textContent = movie.description;
        document.getElementById('showtime').innerHTML = `<strong>Showtime:</strong> ${movie.showtime}`;
        let availableTickets = movie.capacity - movie.tickets_sold;
        document.getElementById('tickets').innerHTML = `<strong>Available Tickets:</strong> ${availableTickets}`;
      })
      .catch(error => console.error('Error fetching movie:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    fetchFirstMovie();
});

const filmsList = document.getElementById('films');
function fetchAllMovies(){
    fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(movies =>{
        movies.forEach(movie => {
            const li = document.createElement('li');
            li.textContent = movie.title;
            li.classList.add('film', 'item');
            filmsList.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching movies:', error));
}
document.addEventListener('DOMContentLoaded', function() {
    fetchFirstMovie();
    fetchAllMovies(); // Add this line
});
// Select the "Buy Ticket" button
const buyTicketButton = document.getElementById('buy-ticket');

// Add a click event listener to the button
buyTicketButton.addEventListener('click', () => {
  // Retrieve the current movie's ID (this assumes you have a way to get the current movie's ID)
  const movieId = getCurrentMovieId();
  // Call the function to handle ticket purchase
  purchaseTicket(movieId);
});

