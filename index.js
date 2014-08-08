"use strict";
var querystring     = require("querystring");
var request         = require("request");
var async           = require("async");

var regex = "href=\"/watch([^\"]*)\"";
var youTubeUrl = "https://www.youtube.com";

var searchArray = ["", ""];

var searchInYouTube = function (searchString, cb) {
    var youTubeSearchUrl = youTubeUrl + "/results?" + querystring.stringify({"search_query": searchString});

    request(youTubeSearchUrl, function (err, response, body) {
        if (err) { return cb(err); }

        var regexResults = body.match(regex),
            path = regexResults[0], //href="/watch?v=T-sxSd1uwoU"
            url;

        url = path.replace("href=\"", youTubeUrl).replace("\"", "");
        return cb(null, url);
    });
};

async.map(searchArray, searchInYouTube, function (err, results) {
    if (err) { throw err; }
    console.log(results);
});



