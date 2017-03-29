// Bring in our scrape script and makeDate scripts
var scrape = require('../scripts/scrape');
var makeDate = require('../scripts/date');

// bring in the Headline and Note mongoose models
var Headline = require('../models/Healine');

module.exports = {
    fetch: function (cb) {
        scrape(function (data) {
            var article = data;
            for (var i = 0; i < article.length; i++) {
                article[i].date = makeDate();
                article[i].saved = false;
            }

            Headline.collection.insertMany(articles, {ordered: false}, function (err, docs) {
                cb(err, docs);
            })
        })
    },
    delete: function (query, cb) {
        Headline.remove(query, cb);
    },
    get: function (query, cb) {
        Headline.find(query)
            .sort({
                _id: -1
            })
            .exec(function (err, doc) {
                cb(doc);
            });
    },
    update: function (query, cb) {
        Headline.update({_id: query._id}, {
            $set: query,
        }, {}, cb);
    }
}