const express = require('express');
const request = require('request');
const app = express();

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
app.use(require('./routes/dummy.js'));

//Getting static folder
app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res){
    res.redirect('/');
});

// Start the app by listening on the default
// Heroku port
const port = process.env.PORT || 3000;
app.listen(port);