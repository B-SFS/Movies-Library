'use strict';
// initelizing variables

// Get express from node model
const express = require("express");

// initializing my server
const app = express();

// read data from JSON file
const data = require("./MovieData/data.json");

// Get axios so we can send HTTP requests to an API


// connect to DB, and init the Client

//end initelizing variables

// To get the data from the body object, it should be upove the paths


// GET: paths
app.get("/" , MovieData);
app.get("/favorite" , favoritePageHandler)



// should be at the end
app.use("*" , notFoundHandler)

// POST: paths


// functions
    //constructor
function MovieInfo(title,poster_path,overview)
{
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}
      //end constructor

// function1
function MovieData(request , response){
    let specificInfo = new MovieInfo(data.title,data.poster_path,data.overview)
return response.status(200).json(specificInfo)
}
// function2
function favoritePageHandler(req, res){
res.status(200).send("Welcome to Favorite Page")
}
//  function3
function notFoundHandler(req, res){
res.status(404).send("Not Found!")
}


// end functions
app.listen(4444 , ()=>{
  
    console.log("You are in Port number 4444");

})
