'use strict';
const express = require("express");
const data = require("./MovieData/data.json");
const app = express();


function movieInfo(title,potser_path,overview){
this.title = title;
this.path = potser_path;
this.overvew = overview;
}


app.get('/' , moviesHandler)
app.get('/favorite' , favouritePageHandler)

function moviesHandler(req , res){
    let arr = []
let spiderMan = new movieInfo("Spider-Man: No Way Home","/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg","Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.");
arr.push(spiderMan);
return res.status(200).send(arr); 
}
function favouritePageHandler(request , response)
{
    return response.send("Welcome to Favorite Page");
}
app.listen(3000,() => {
    console.log("Listen on 3000");
});