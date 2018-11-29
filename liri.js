require("dotenv").config();

var fs = require("fs")
const keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");
var concert = require()

const userCommand = process.argv[2];
const secondCommand = process.argv[3];

var spotify = new Spotify(keys.spotify);
var omdbKey = keys.omdb.api_key;

switch (userCommand){
    case("concert-this"):
        getConcert();
    break;
    case('spotify-this-song'):
        if(secondCommand){
            spotifyThisSong(secondCommand);
        } else{
            spotifyThisSong("The Sign")
        }
    break;
    case('movie-this'):
        if(secondCommand){
            omdb(secondCommand);
        } else{
            ombd("Mr. Nobody");
        }
    break;
    case('do-what-it-says'):
        doThing();
    break;
    default:
        console.log("Again");
    };

    function getConcert(movie){
        var concertURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=0d06655ab493202c739af51220ea190d";
      
        request(concertURL, function (error, response, EventData){
          if(!error && response.statusCode == 200){
            var EventData = JSON.parse(EventData);
      
            console.log("Venue: " + EventData.VenueData.name);
            console.log("City: " + EventData.VenueData.city);
            console.log("Date: " + EventData.datetime);
            
          } else{
            console.log('Error occurred.')
        }
    });


function spotifyThisSong(song){
        spotify.search({ type: 'track', query: song, limit: 1}, function(error, data){
            if(!error){
            for(var i = 0; i < data.tracks.items.length; i++){
                var songData = data.tracks.items[i];
                          
                console.log("Artist: " + songData.artists[0].name);
                console.log("Song: " + songData.name);  
                console.log("Preview URL: " + songData.preview_url);
                console.log("Album: " + songData.album.name);
                console.log("-----------------------");
                } 
            } else {
            console.log('Error occurred.');
            }
        });
        }
    
function omdb(movie){
            var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&apikey=' + omdbKey + '&plot=short&tomatoes=true';
          
            request(omdbURL, function (error, response, body){
              if(!error && response.statusCode == 200){
                var body = JSON.parse(body);
          
                console.log("Title: " + body.Title);
                console.log("Release Year: " + body.Year);
                console.log("IMdB Rating: " + body.imdbRating);
                console.log("Country: " + body.Country);
                console.log("Language: " + body.Language);
                console.log("Plot: " + body.Plot);
                console.log("Actors: " + body.Actors);
                console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
                console.log("Rotten Tomatoes URL: " + body.tomatoURL);
                
              } else{
                console.log('Error occurred.')
              }
              if(movie === "Mr. Nobody"){
                console.log("-----------------------");
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");
    
              }
            });
          
          }
function doThing(){
            fs.readFile('random.txt', "utf8", function(error, data){
              var txt = data.split(',');
          
              spotifyThisSong(txt[1]);
            });
          }};
