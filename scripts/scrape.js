// Scrape Script
// ==========================

// Require request and cheerio packages to make scrape possible
var request = require('request');
var cheerio = require('cheerio');

var scrape = function (cb) {
    request("http://www.nytimes.com", function (err, res, body) {
        var $ = cheerio.load(body);

        var article = [];

        $(".theme-summary").each(function (i, element) {
            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children(".summary").text().trim();

            if ( head && sum ) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };
                article.push(dataToAdd);
            }
        });
        cb(article);
    });
};

module.exports = scrape;