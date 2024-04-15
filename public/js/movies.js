$(document).ready(function () {
    // Fetch and display movies on page load
    fetchAllMovies();

    // Function to fetch all movies
    function fetchAllMovies() {
        $.ajax({
            type: "GET",
            url: "/api/movies",
            success: function (movies) {
                displayMovies(movies);
            },
            error: function (xhr, status, error) {
                console.log("Error:", error);
            },
        });
    }

    // fetch all movies
    $("#fetch-all-movies").on("click", () => {
        fetchAllMovies();
    });

    // Function to fetch a movie by ID
    function fetchMovieById(id) {
        $.ajax({
            type: "GET",
            url: `/api/movies/${id}`,
            success: function (movie) {
                displayMovies(movie);
            },
            error: function (xhr, status, error) {
                displayMovies(error)
                console.log("Error:", error);
            },
        });
    }

    // Function to add a new movie
    $("#add-movie").on("click", function (e) {
        e.preventDefault();
        const title = $("#title").val();
        const genre = $("#genre").val();

        const errorBox = $(".error");
        errorBox.empty();

        if (!title || !genre) {
            errorBox.text("Title and Genre are required");
            return;
        }

        const newMovie = {
            title: title,
            genre: genre,
        };

        $.ajax({
            type: "POST",
            url: "/api/movies",
            data: JSON.stringify(newMovie),
            contentType: "application/json",
            success: function (response) {
                console.log("Movie added successfully:", response);
                fetchAllMovies();
            },
            error: function (xhr, status, error) {
                console.log("Error:", error);
            },
        });
    });

    // Function to delete a movie
    $("#movieList").on("click", ".deleteMovie", function () {
        const movieId = $(this).data("id");
        console.log("movieId", movieId)
        $.ajax({
            type: "DELETE",
            url: `/api/movies/${movieId}`,
            success: function (response) {
                console.log("Movie deleted successfully:", response);
                fetchAllMovies();
            },
            error: function (xhr, status, error) {
                console.log("Error:", error);
            },
        });
    });

    // Event listener for fetching a movie by ID
    $("#movie-by-id").on("click", function () {
        const movieId = $("#movie-id-box").val();
        console.log("movieId", movieId)
        if (!movieId) {
            alert("Please enter a movie ID.");
            return;
        }
        fetchMovieById(movieId);
    });

    function displayMovies(movies) {
        console.log("all movies in display", movies, typeof movies);
        $("#movieList").empty();
        let listItem = ``;
        if (typeof movies == "object") {
            console.log("");
            movies.data.forEach(function (movie) {
                listItem = `
                           <tr>
                           <td>${movie?.id} </td>
                           <td>${movie?.title} </td>
                           <td>${movie?.genre} </td>
                           <td class="">
                               <button class="deleteMovie movie-button-delete btn btn-danger" data-id="${movie?.id}">Delete Movie</button>
                           </td>
                           </tr>`;
                $("#movieList").append(listItem);
            });
        } else {
            listItem = `
                           <tr>
                           <td colspan="4">${movies} </td>
                           </tr>`;

            $("#movieList").append(listItem);
        }
    }
});
