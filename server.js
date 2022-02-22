'use strict';
const express = require("express");
const data = require("./MovieData/data.json");
const app = express();
const Api = require("axios");
const axios = axios();
app.get('/' , moviesHandler)
app.get('/favorite' , favouritePageHandler)
app.get('/trending', trendingHandler);
app.get('/searchMovies', searchMoviesHandler);
app.use("*", notFoundHandler);
app.use(errorHandler);

const KEY = "9156d3294f952e6f7e07e6b1710bcf32";


axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query}`)
    .then(apiResponse=> {

        apiResponse.data.results.map(value => {
            let oneResult = new Movie(value.id, value.title,value.release_date, value.poster_path, value.overview);
            results.push(oneResult);
        });

        return res.status(200).json(results);
    })
    .catch(error => {
        errorHandler(req, res,error);
    })
    function trendingHandler(request, response){
        let result = [];
        axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${KEY}&language=en-US`)
        .then(apiResponse => {
            apiResponse.data.results.map(value => {
                let oneResult = new Movie(value.id, value.title,value.release_date, value.poster_path, value.overview);
                result.push(oneResult);
            });
    
            return response.status(200).json(result);
    
        }).catch(error => {
            errorHandler(request, response, error);
        });
    }

    function errorHandler(request, response, error){

        const err = {
            status : 500,
            message : error
        }
    
        return res.status(500).send(err);
    }

function movieInfo(title,potser_path,overview){
this.title = title;
this.path = potser_path;
this.overvew = overview;
}

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
