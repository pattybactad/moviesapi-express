const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.set("views", "./views");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.set("view engine", "ejs");

let movies = [];

//route
app.get("/", async function (req, res) {
	res.render("movies", { title: "Movies API Test with Express" });
});

app.get("/api/movies", (req, res) => {
    res.json({
        success: 1,
        message: "Movies retrieved successfully",
        data: movies,
    });
});

//Get movie by id
app.get("/api/movies/:id", (req, res) => {
	const id = req.params.id;
	console.log("get movie by id", id);
	const movie = movies.find((movie) => movie.id == id);
	console.log("found movie by id", movie);
	if (movie) {
		res.status(200).json({
			success: 1,
			message: "Movies retrieved successfully",
			data: [movie],
		});
	} else {
		res.status(404).json({
			success: 0,
			message: "Movie not found",
			data: [],
		});
	}
});

app.post("/api/movies", (req, res) => {
    const newMovie = req.body;
    newMovie.id = movies.length + 1;
    movies.push(newMovie);
    res.status(200).json({
        success: 1,
        message: "Movie added successfully",
        data: newMovie,
    });
});

app.delete("/api/movies/:id", (req, res) => {
    const id = req.params.id;
    const index = movies.findIndex((movie) => movie.id == id);
    if (index !== -1) {
        movies.splice(index, 1);
        res.status(200).json({
            success: 1,
            message: "Movie deleted successfully",
        });
    } else {
        res.status(404).json({
            success: 0,
            message: "Movie not found",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
