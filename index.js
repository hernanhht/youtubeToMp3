"use strict";
var querystring     = require("querystring");
var request         = require("request");
var async           = require("async");
var http            = require('http');
var fs              = require('fs');

var regex = "href=\"/watch([^\"]*)\"";
var youTubeUrl = "http://www.youtube.com";
var youTubeToMp3URL = "http://youtubeinmp3.com/fetch/?video=";

var searchArray = [];

var searchInYouTube = function (searchString, cb) {
    var youTubeSearchUrl = youTubeUrl + "/results?" + querystring.stringify({"search_query": searchString});

    request(youTubeSearchUrl, function (err, response, body) {
        if (err) { return cb(err); }

        var regexResults = body.match(regex),
            path = regexResults[0], //href="/watch?v=T-sxSd1uwoU"
            url;

        url = path.replace("href=\"", youTubeUrl).replace("\"", "");
        return cb(null, {searchString: searchString, url: url});
    });
};

var downloadMp3 = function (result, cb) {
    var file = fs.createWriteStream(result.searchString + ".mp3");

    request(youTubeToMp3URL + result.url, function (err, response, fileUrl) {
        if (err) { return cb(err); }

        http.get(fileUrl, function (res) {
            console.log("Downloading MP3 for: " + result.searchString);
            res.pipe(file);

            res.on('end', function () {
                cb();
            });
        });
    });
};

async.map(searchArray, searchInYouTube, function (err, results) {
    if (err) { throw err; }

    async.each(results, downloadMp3, function (err) {
        if (err) { throw err; }

        console.log("All files downloaded");
    });
});



