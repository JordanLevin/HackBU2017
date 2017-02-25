var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

//var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
var mongoose = require('mongoose');
var opts = {
    server: {
        socketOptions: {keepAlive: 1}
    }
};
mongoose.connect('mongodb://jordan:realcsmajor@ds163758.mlab.com:63758/jordantest');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});
var milkshake = mongoose.Schema({
    flavor: String,
    points: Number
});
var stuff = mongoose.model('stuff', milkshake);

//total list of flavors
var flavors = ["Vanilla", "Strawberry", "Chocolate", "Cookie Dough", "Caramel", "Mint"];


/*setTimeout(function(){
    resetData();
}, 3600 * 24 * 1000);*/


function resetData(){

    stuff.remove({}, function(err) {
        console.log('collection removed')
    });

    for(var i in flavors){

        var data = new stuff({
            flavor: flavors[i],
            points: 0
        });
        data.save();
    }

}




//take a post request with flavor
app.post('/submit-flavor', function(req, res){
    var id = req.body.id;
    //console.log(id);
    var temp;
    stuff.findOne({_id: id}, function(err, data){
       temp =  data;
        //console.log(temp);
        var p = temp.points;
        //console.log(p);

        stuff.update({ _id: id }, { $set: { points: p+1  }}, function(err, data){
            //does anything go in here?
        });
    });


    /*var data = new stuff({
        flavor: req.body.flavor,
        points: req.body.points
    });

    f.save(function(err){
        if(err) return console.error(err);
        console.log("saving choices to database");
        return res.redirect(303, '/');
    });*/

});
app.get('/flavors', function(req, res){
    res.render('flavors');
});
/* GET home page. */
app.get('/', function(req, res, next) {
    stuff.find(function(err, milkshakes){
       console.log(milkshakes);
    });
    res.render('index', { title: 'Express' });
});



app.get('/flavorList', function(req, res){
    stuff.find(function(err, milkshakes){
        //console.log(milkshakes);
        res.json(milkshakes);
    });
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
