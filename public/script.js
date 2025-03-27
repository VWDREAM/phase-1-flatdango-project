const BASE_URL = "https://phase-1-flatdango-project-5.onrender.com/films";
const filmList = document.getElementById("films");
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const description = document.getElementById("film-info");
const runtime = document.getElementById("runtime");
const showtime = document.getElementById("showtime");
const tickets = document.getElementById("tickets");
const buyButton = document.getElementById("buy-ticket");

let currentMovie = null; // Store current movie

// Fetch all movies and list them
function fetchMovies() {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((movies) => {
      filmList.innerHTML = ""; // Clear the list
      movies.forEach((movie) => addMovieToList(movie));
      if (movies.length > 0) fetchMovie(movies[0].id); // Display first movie by default
    })
    .catch((error) => console.error("Error fetching movies:", error));
}

// Add movie to the movie list
function addMovieToList(movie) {
  const li = document.createElement("li");
  li.textContent = movie.title;
  li.classList.add("film-item");
  li.addEventListener("click", () => fetchMovie(movie.id));
  filmList.appendChild(li);
}

// Fetch and display movie details
function fetchMovie(movieId) {
  fetch(`${BASE_URL}/${movieId}`)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then((movie) => {
      // Ensure at least 5 tickets are available
      const resetTicketsSold = Math.max(0, movie.capacity - 5);

      return fetch(`${BASE_URL}/${movieId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tickets_sold: resetTicketsSold }),
      })
      .then(() => ({ ...movie, tickets_sold: resetTicketsSold })); // Update local tickets_sold
    })
    .then((movie) => {
      currentMovie = movie;
      displayMovieDetails(movie);
    })
    .catch((error) => console.error("Error fetching movie:", error));
}

// Display movie details
function displayMovieDetails(movie) {
  poster.src = movie.poster;
  title.textContent = movie.title;
  description.textContent = `Description: ${movie.description}`;
  runtime.textContent = `Runtime: ${movie.runtime} minutes`;
  showtime.textContent = `Showtime: ${movie.showtime}`;
  updateTicketDisplay(movie);
}

// Update ticket availability text
function updateTicketDisplay(movie) {
  const availableTickets = movie.capacity - movie.tickets_sold;
  tickets.textContent = `Available Tickets: ${availableTickets}`;

  // Disable buy button if sold out
  buyButton.disabled = availableTickets <= 0;
  buyButton.textContent = availableTickets > 0 ? "Buy Ticket" : "Sold Out";
}

// Buy ticket functionality
buyButton.addEventListener("click", () => {
  if (!currentMovie || currentMovie.tickets_sold >= currentMovie.capacity) return;

  const newTicketsSold = currentMovie.tickets_sold + 1;
  fetch(`${BASE_URL}/${currentMovie.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tickets_sold: newTicketsSold }),
  })
  .then(() => {
    currentMovie.tickets_sold = newTicketsSold;
    updateTicketDisplay(currentMovie);
  })
  .catch((error) => console.error("Error updating tickets:", error));
});

// Initialize the app
fetchMovies();
