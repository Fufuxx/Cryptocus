const express = require('express');
const app = express();

const Dummy = require('./models/dummy.js');

//Creating a Record
Dummy.forge({
        name: 'Dummy',
        url: 'www.dummy.dummy'
    }).save().then(function(record){
        console.log('Record Created ');
        console.log(record);
        //Delete it
        record.destroy({}).then(function() {
                console.log('Record Destroyed');
            })
            .catch(function(err){
                console.log('Delete Error');
                console.log(err);
            });
            
    }).catch(function (err) {
        console.log('Error Occurred');
        console.log(err);
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