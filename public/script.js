// Global variables
let currentMovieId = null;

// DOM elements
const poster = document.getElementById('poster');
const title = document.getElementById('title');
const runtime = document.getElementById('runtime');
const showtime = document.getElementById('showtime');
const tickets = document.getElementById('tickets');
const filmsList = document.getElementById('films');
const buyTicketButton = document.getElementById('buy-ticket');

// Base URL for fetching data from the deployed JSON server
const BASE_URL = "https://phase-1-flatdango-project-5.onrender.com/films";

// Function to display movie details
function displayMovieDetails(movie) {
    currentMovieId = movie.id; // Update current movie

    title.textContent = movie.title;
    runtime.innerHTML = `<strong>Runtime:</strong> ${movie.runtime} minutes`;
    poster.src = movie.poster;
    document.getElementById('film-info').textContent = movie.description;
    showtime.innerHTML = `<strong>Showtime:</strong> ${movie.showtime}`;
    const availableTickets = movie.capacity - movie.tickets_sold;
    tickets.innerHTML = `<strong>Available Tickets:</strong> ${availableTickets}`;

    if (availableTickets === 0) {
        buyTicketButton.textContent = 'Sold Out';
        buyTicketButton.disabled = true;

        // Add sold-out class to film item
        const filmItems = document.querySelectorAll('#films li');
        filmItems.forEach(film => {
            if (film.textContent.includes(movie.title)) {
                film.classList.add('sold-out');
            }
        });
    } else {
        buyTicketButton.textContent = 'Buy Ticket';
        buyTicketButton.disabled = false;
    }
}

// Fetch first movie details
function fetchFirstMovie() {
    fetch(`${BASE_URL}/1`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(movie => {
            displayMovieDetails(movie);
        })
        .catch(error => console.error('Error fetching movie:', error));
}

// Fetch and display all movies
function fetchAllMovies() {
    fetch(BASE_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(movies => {
            filmsList.innerHTML = ''; // Clear placeholder
            movies.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = movie.title;
                li.classList.add('film', 'item');

                // Click event to display details
                li.addEventListener('click', () => {
                    displayMovieDetails(movie);
                });

                // Create delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.style.marginLeft = '10px';
                deleteButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    deleteMovie(movie.id, li);
                });

                li.appendChild(deleteButton);
                filmsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
}

// Function to delete a movie
function deleteMovie(movieId, listItem) {
    fetch(`${BASE_URL}/${movieId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        listItem.remove(); // Remove from UI
    })
    .catch(error => console.error('Error deleting movie:', error));
}

// Fetch movies on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchFirstMovie();
    fetchAllMovies();
});

