// Global variables
let currentMovieId = null;

//DOM elements
const poster = document.getElementById('poster');
const title = document.getElementById('title');
const runtime = document.getElementById('runtime');
const showtime = document.getElementById('showtime');
const tickets = document.getElementById('tickets');
const filmsList = document.getElementById('films');
const buyTicketButton = document.getElementById('buy-ticket');

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

        //sold-out class to film item
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
    fetch('http://localhost:3000/films/1')
        .then(response => response.json())
        .then(movie => {
            displayMovieDetails(movie);
        })
        .catch(error => console.error('Error fetching movie:', error));
}

// Fetch and display all movies
function fetchAllMovies() {
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(movies => {
            filmsList.innerHTML = ''; // Clear placeholder
            movies.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = movie.title;
                li.classList.add('film', 'item');

                // click event to each movie
                li.addEventListener('click', () => {
                    displayMovieDetails(movie);
                });

                // Create delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.style.marginLeft = '10px';
                deleteButton.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent triggering movie details

                    fetch(`http://localhost:3000/films/${movie.id}`, {
                        method: 'DELETE'
                    })
                    .then(() => {
                        li.remove(); // Remove from DOM
                        console.log(`Deleted film: ${movie.title}`);
                    })
                    .catch(error => console.error('Error deleting film:', error));
                });

                li.appendChild(deleteButton);
                filmsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
}

// Purchase ticket
function purchaseTicket() {
    if (!currentMovieId) return; // No movie selected

    fetch(`http://localhost:3000/films/${currentMovieId}`)
        .then(response => response.json())
        .then(movie => {
            const availableTickets = movie.capacity - movie.tickets_sold;
            if (availableTickets > 0) {
                const updatedTicketsSold = movie.tickets_sold + 1;

                fetch(`http://localhost:3000/films/${currentMovieId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tickets_sold: updatedTicketsSold }),
                })
                    .then(response => response.json())
                    .then(updatedMovie => {
                        displayMovieDetails(updatedMovie);
                    })
                    .catch(error => console.error('Error updating tickets:', error));
            }
        })
        .catch(error => console.error('Error fetching movie:', error));
}

// Add event listener for Buy Ticket button
buyTicketButton.addEventListener('click', purchaseTicket);

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    fetchFirstMovie();
    fetchAllMovies();
});

