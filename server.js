const express = require("express");
const pokemon = require("./models/pokemon");
const app = express();

const pokemons = require("./models/pokemon.js")
const morgan = require("morgan");
const methodOverride = require("method-override");

//Middleware
app.use(express.urlencoded({ extended: false }));
//Logging
app.use(morgan("tiny"));
//Public Folder Files
app.use("/static", express.static("public"));
//Overriding Methods for PUT and DELETE
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.send("Server is working")
})

app.get("/pokemon", (req, res) => {
    res.render("index.ejs", { allPokemon: pokemons })
})

app.listen("3000", () => {
    console.log("You are listening to PORT 3000")
})