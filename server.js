var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var port = 3000;

var app = espress();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var connection = mongoose.connect('mongodb://localhost/dog_db');

var dogSchema = new mongoose.Schema({
	    name: String,
	    weight: Number,
	    color: String
    });

    var dog = mongoose.model('dog', dogSchema);

app.get('/', function(req, res){
	    dog.find({}, function(err, results){
		        if (err) { console.log(err); }
		        res.render('index', { dogs: results });
	    });
});

app.post('/', function(req, res){
	    dog.create(req.body, function(err, result){
		        if (err) { console.log(err); }
		        res.redirect('/')
	    });
});

app.get('/new', function(req, res){
	res.render('new');

app.get('/:id', function(req, res){
        dog.find({_id: req.params.id}, function(err, response){
    	       if (err) { console.log(err); }
    	       res.render('show', { dog: response[0] });
        });
});

app.post('/:id', function(req, res){
	    dog.update({ _id: req.params.id }, req.body, function(err, result){
		        if (err) { console.log(err); }
		        res.redirect('/')
	    });
	    res.redirect('/')
});

app.post('/:id/delete', function(req, res){
	    dog.remove({_id: req.params.id}, function(err, response){
		        if (err) { console.log(err); }
		        res.redirect('/')
	    });
});

app.listen(port, function(){
	    console.log("Running on ", port);
});
