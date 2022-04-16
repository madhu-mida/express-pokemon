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

// Index
app.get("/pokemon", (req, res) => {
    res.render("index.ejs", { allPokemon: pokemons })
})

// New
app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs")
})

// Show
app.get("/pokemon/:id", (req, res) => {
    console.log(pokemons[req.params.id])
    res.render("show.ejs", { pokemon: pokemons[req.params.id], index: req.params.id })
})

// Edit
app.get("/pokemon/:id/edit", (req, res) => {
    res.render("edit.ejs", { pokemon: pokemons[req.params.id], index: req.params.id })
})

// Create
app.post("/pokemon", (req, res) => {

    console.log(req.body)
    req.body.type = (req.body.type).split(",")
    createObjPokemon = {
        id: (pokemons.length) + 1,
        name: req.body.name,
        img: req.body.img,
        type: req.body.type,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        }
    }
    pokemons.push(createObjPokemon)
    console.log(pokemons[(pokemons.length) - 1])
    res.redirect("/pokemon")
})

// Update
app.put("/pokemon/:id", (req, res) => {
    pokemons[req.params.id].name = req.body.name
    pokemons[req.params.id].img = req.body.image
    pokemons[req.params.id].type = (req.body.type).split(",")
    pokemons[req.params.id].stats.hp = req.body.hp
    pokemons[req.params.id].stats.attack = req.body.attack
    pokemons[req.params.id].stats.defense = req.body.defense
    console.log(pokemons[req.params.id])
    res.redirect("/pokemon")
})

// Delete
app.delete("/pokemon/:id", (req, res) => {
    const index = req.params.id;
    pokemons.splice(index, 1)
    res.redirect("/pokemon")
})

app.listen("3000", () => {
    console.log("You are listening to PORT 3000")
})