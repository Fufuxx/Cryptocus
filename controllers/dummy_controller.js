const Dummy = require('../models/dummy.js');

module.exports = {
    create: function(req, res, next){
        //Creating a Record
        console.log('Creating Record');
        let dummy = JSON.parse(req.body)
        Dummy.forge({
            name: dummy.name,
            url: dummy.url
        }).save().then(function(record){
            console.log('Record Created ');
            res.json({ error: false, message: 'Record Created', record: record });     
        }).catch(function (err) {
            console.log('Error Occurred');
            res.json({ error: true, message: 'Oops! Something went wrong!', error: err });
        }); 
    },
    list: function(req, res, next){
        console.log('List');
        Dummy.fetchAll().then(function(collection){
            res.json({ error: false, message: 'List Records', records: collection});
        })
        .catch(function(err) {
            console.log('Fetch all Error');
            res.json({ error: true, message: 'Oops! Something went wrong!', error: err });
        });
    }
}

//Delete it
    // record.destroy({}).then(function() {
    //         console.log('Record Destroyed');
    //     })
    //     .catch(function(err){
    //         console.log('Delete Error');
    //         console.log(err);
    //     });