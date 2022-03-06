'use strict';
// initelizing variables

// Get express from node model
const express = require("express");

// initializing my server
const app = express();

// read data from JSON file
const localJsonData = require("./MovieData/data.json");

// Get axios so we can send HTTP requests to an API

const axios = require("axios");

// READ .env file
const env = require("dotenv");
// start(config).env
env.config();

// connecting the database with the server
const pg = require("pg");
const { response } = require("express");

// variables coming from .env file;
const APIKEY = process.env.APIKEY;
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;
//end initelizing variables
// initialize the connection
const client = new pg.Client(DATABASE_URL);
// To get the data from the body object, it should be upove the paths


// GET: paths
app.use(express.json());
app.get("/", MovieDataJson);
app.get("/favorite", favoritePageHandler)
app.get("/trending", apiMovieData)
app.get("/search" , MovieSearchHandler)
app.get("/reviews" , ReviewsHandler)
app.post("/addmovie" , addMovieHandler)
app.get("/getmovies" , getDataBaseMoviesHandler)

// should be at the end
app.use("*", notFoundHandler)
// using the handle error funciton 
app.use(ErrorHandler);
// POST: paths

// functions
//constructor
function MovieInfo(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}
//end constructor

// function1
function MovieDataJson(request, response) {
    let specificInfo = new MovieInfo(localJsonData.title, localJsonData.poster_path, localJsonData.overview)
    return response.status(200).json(specificInfo)
}
// function2
function favoritePageHandler(req, res) {
    res.status(200).send("Welcome to Favorite Page")
}
//  function3
function notFoundHandler(req, res) {
    res.status(404).send("Not Found!")
}
// function4
function apiMovieData(req, res) {

    let apiArray = []
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US`)
        .then(result => {
            result.data.results.map(value => {
                let specificApiInfo = new MovieInfo(value.id, value.title, value.release_date, value.poster_path, value.overview)
                apiArray.push(specificApiInfo);
            })
           res.status(200).json(apiArray);
        }).catch(error=>{
            ErrorHandler(error,req,res)
        });
    
}
// function5

function MovieSearchHandler(req , res){
const search = req.query.MovieName
const searchResults = [];
axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${search}`)
.then(apiResponse=>{
apiResponse.data.results.map(value =>{
const movie = new MovieInfo(value.id || "N/A",value.title || "N/A",value.release_date || "N/A",value.poster_path || "N/A",value.overview || "N/A")
searchResults.push(movie);
});
return res.status(200).json(searchResults);
}).catch(error=>{
    ErrorHandler(error,req,res)
})


}
// function6
function ErrorHandler(error,req,res){
const err = {
    status:500,
    message:error
}
}
// function7
function ReviewsHandler(req,res){
 
}
// function 8 
function addMovieHandler(req , res){
 const movie = req.body;
 const sql = `INSERT INTO MOVIELIST(title,release_date,poster_path,overview) VALUES ($1,$2,$3,$4) RETURNING * `
 const values = [movie.title,movie.release_date,movie.poster_path,movie.overview]
 client.query(sql,values).then(result =>{
    return res.status(201).json(result.rows);
 }).catch((error) =>{
     ErrorHandler(error,req,res)
 })
//  return res.status(200).json(data);
}
function getDataBaseMoviesHandler(req,res){
const sql = `SELECT * FROM MOVIELIST`
client.query(sql).then((result)=>{
    return res.status(200).json(result.rows);
}).catch((error)=>{
    ErrorHandler(error,res,req)
})
}
// end functions
client.connect()
.then(()=>{
    app.listen(PORT, () => {
    console.log(`Your are in Port ${PORT}`);

})
})
