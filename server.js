const express = require('express');
const request = require('request');
const app = express();

const Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.TOKEN_SECRET
});

// This gives me the ability to call req.body at any point in order to get the content of the body of any request
app.use(function(req, res, next){
    var data='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
       data += chunk;
    });

    req.on('end', function() {
        req.body = data;
        next();
    });
});

//Handle Routes
//app.use(require('./routes/dummy.js'));
app.post('/tweets', function(req, res, next){
    var query = JSON.parse(req.body).query;
    client.get('search/tweets', { q : query, count : 100, result_type: 'recent' }, 
        function(error, tweets, response) {
            if(error){
                console.log(error);
                res.json({ error: true, data: error });
            }
            else{
                res.json({ error: false, tweets: tweets });
            }
    });

});

//Getting static folder
app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res){
    res.redirect('/');
});

// Start the app by listening on the default
// Heroku port
const port = process.env.PORT || 3000;
app.listen(port);