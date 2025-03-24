# Flatdango 🎬🍿

Welcome to Flatdango — a mini web app for Flatiron Movie Theater. This app allows users to view movie details, purchase tickets, and manage available movies.

## Learning Goals

 Demonstrate understanding of the three pillars of JavaScript:
 Handling Events
 Manipulating the DOM
 Communicating with a Server (CRUD operations)

---

## Project Setup

### Pre-requisite Data
Use the provided `db.json` .

### Steps:
1. Create a new project folder.
2. Create a **private** GitHub repository.
3. Add your Technical Mentor (TM) as a contributor (for grading purposes).
4. Regularly commit your progress to the repository.

## Demo

Refer to the Flatdango App demo GIF for an example of how the app should function.

---

## Core Deliverables

### As a user, I can:

1. **View First Movie Details**
   - See poster, title, runtime, showtime, and available tickets when the page loads.
   - Available tickets = `capacity - tickets_sold`.
   - API: `GET /films/1`

2. **View All Movies List**
   - See all movies listed in the sidebar (`ul#films`).
   - Optionally style using `film item` classes.
   - API: `GET /films`

3. **Buy a Ticket**
   - Click "Buy Ticket" to decrease available tickets.
   - Prevent purchase if tickets are sold out.
   - Persist ticket sales:
     - Update `tickets_sold` using:
       ```
       PATCH /films/:id
       Headers: Content-Type: application/json
       Body: { "tickets_sold": updatedCount }
       ```
   - POST ticket sale to database:
     ```
     POST /tickets
     Body: { "film_id": filmId, "number_of_tickets": quantity }
     ```

4. **Delete a Film**
   - Add a delete button next to each film.
   - Clicking it removes the film from both UI and server.
   - API: `DELETE /films/:id`

5. **Sold Out State**
   - Change "Buy Ticket" button text to **"Sold Out"** when tickets = 0.
   - Add `sold-out` class to sold out films in `ul#films`.

---

## Bonus Features

- Click any movie in the sidebar to display its details.
- (Optional: May require additional `GET` requests)
