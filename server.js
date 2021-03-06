var express = require('express');
// var session    = require('express-session')
var app = express(),
	bodyParser = require('body-parser');
    hotels = require('./server/controllers/hotels'),
    api = require('./server/controllers/api');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');

// For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Models
var models = require("./server/models");
models.sequelize
  .authenticate()
  .then(function () {
    console.log('Connection successful');
  })
  .catch(function(error) {
    console.log("Error creating connection:", error);
  });

// Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

// ROUTES
app.get('/', function(req, res) {
    res.send('Welcome to Node !');
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/hotels/:countrycode/:city/:page', hotels.show); // From Db
app.get('/api/:countrycode/:city/:page/:checkindate/:checkoutdate/:numofadults/:numofchildren', api.findHotelsByCityId); // From API
app.get('/api/:countrycode/:city/:page/:checkindate/:checkoutdate/:numofadults/:numofchildren/:hotelid', api.findHotelByHotelId); // From API
app.get('/api/HotelPolicy/:optionid', api.getPolicyForOptionId); // From API
app.post('/api/HotelBooking/:optionid/:roomid', api.bookForOptionIdRoomId); // From API
app.get('/hotels/getAllCities/:query', hotels.getAllCities); // From Db


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(err) {
    if (!err)
        console.log("Site is running at port", app.get('port'));
    else console.log(err)
});