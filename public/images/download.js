const Deck = require('../../src/holdem-poker/Deck');
const https = require('https');
const fs = require('fs');


var download = function (url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = https.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function (err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};


const deck = new Deck();
for (let suit of deck.SUITS) {
    for (let value of deck.VALUES) {
        const card = (suit + value).toLowerCase();
        const url = `https://estopoker.com/images/deck/classic/${card}.svg`;


        download(url, './' + card + '.svg');
    }
}

