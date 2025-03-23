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
