require("dotenv").config();
let fs = require("fs");
let figlet = require("figlet");
let request = require("request");
let keys = require("./key.js");
let spotify = require("node-spotify-api");
let Spotify = new spotify(keys.spotifys);
let chalk = require("chalk");
let command = process.argv[2];
let parameter = process.argv[3];

function switchCase() {
    switch (command) {
        case 'concert-this':
            bandInTown(parameter);
            break;

        case 'movie-this':
            omdbInfo(parameter);
            break;

        case 'spotify-this-song':
            spotifySong(parameter);
            break;

        case 'do-what-it-says':
            getRandom();
            break;

        default:
            display(Invalid);
            break;
    }
};

function bandInTown(parameter) {
    if (concert - this) {
        var artist = "";
        for (var i = 3; i < process.argv.length; i++) {
            artist += process.argv[i];
        }
        let bands = "Bandsintown"
        figlet(bands, function (err, data) {
            if (err) {
                console.log("something is wrong")
                console.dir(err);
                return;
            }
            console.log(chalk.green(data));
        });
    } else {
        artist = parameter;
    }
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var JSON = JSON.parse(body);
            for (i = 0; i < JSON.length; i++) {
                var date = JSON[i].datetime;
                var month = date.substring(5, 7);
                var year = date.substring(0, 4);
                var day = date.subsctring(8, 10);
                var completeDate = month + "/" + day + "/" + year

                display(clalk.blue("\n--------------------\n"));
                display(clalk.green("Name: " + JSON[i].venue.name));
                display(clalk.green("City: " + JSON[i].venue.city));
                display(clalk.green("Date: " + JSON[i].venue.completeDate));
                display(clalk.blue("\n--------------------\n"));
            }

        }

    });

}

let spotifyFig = "spotify"

function spotifySong(parameter) {
    var searchSong;
    if (parameter === undefined) {
        searchSong = "Ace of Base Beautiful Life";
    } else {
        searchSong = parameter;
    }

    figlet(spotifyFig, function (err, data) {
        if (err) {
            console.log("something is wrong!!!");
            console.dir(err);
            return;
        }
        console.log(clalk.green(data));
    });
    Spotify.search({
        type: 'track',
        query: searchSong
    }, function (error, data) {
        if (error) {
            display('error:' + error);
            return;
        } else {
            display(clalk.blue("\n--------------------\n"));
            display(clalk.green("Artist: " + data.tracks.items[0].artists[0].name));
            display(clalk.green("Song: " + data.tracks.items[0].name));
            display(clalk.green("Album: " + data.tracks.items[0].album.name));
            display(clalk.blue("\n--------------------\n"));
        }
    });

};

function omdbInfo(parameter) {
    var findMovie;
    if (parameter === undefined) {
        findMovie = "The Matrix";
    } else {
        findMovie = parameter;
    };

    let omdbInfo = "OMDB"
    figlet(omdbFig, function (err, data) {
        if (err) {
            console.log("something is wrong!!!");
            console.dir(err);
            return;
        }
        console.log(clalk.green(data));
    });

    var queryURL = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function (err, res, body) {
        var omdbInf = JSON.parse(body);
        if (!err && res.statusCode === 200) {
            display(clalk.blue("\n--------------------\n"));
            display(clalk.green("Title: " + omdbInf.Title));
            display(clalk.green("Release Year: " + omdbInf.Year));
            display(clalk.green("IMDB Rating: " + omdbInf.imdbRating));
            display(clalk.blue("\n--------------------\n"));
        }
    });
};

function getRandom() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (error) {
            return display(error);
        }
        var dataSearch = data.split(",");
        if (dataSearch[0] === "spotify-this-song") {
            var dataCheck = dataSearch[1].trim().slice(1, -1);
            spotifySong(dataCheck);
        }
    });
};

function display(dataLog) {
    console.log(dataLog);
    fs.appendFile('log.txt', dataLog + '\n', function (err) {
        if (err) return display('errorwith data: ' + err);
    })
}
switchCase();