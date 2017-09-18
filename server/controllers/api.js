var http = require("http");
var express = require("express");
var qs = require("querystring");
var parseString = require('xml2js').parseString;
var dateFormat = require('dateformat');
var models = require("../models");
var helpers = require("../common");
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config')[env];

var sequelize = new Sequelize(config.database, config.username, config.password, config);


var app = express();

var userName = "1d30ab517dd70cdd21c0649a0c4255fd";
var password = "mT7C0UxRPeVn";

var header = 
        '		<Username>USERNAME</Username>\n\t\t' +
        '		<Password>PASSWORD</Password>\n\t\t' +
        '		<RequestType>REQUESTTYPE</RequestType>\n\t';


module.exports = {
  //Get a list of all Hotels using model.findAll()
  findHotelsByCityId(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    // Get the City Id from Name
	console.log(req.params.checkindate);
    models.Cities.findAll({
      where: {
        CityName: req.params.city,
        CountryCode: req.params.countrycode
      },
      attributes: ['CityId'],
      limit: 1
    }).then(City => {
		var CheckInDate = dateFormat(req.params.checkindate, "yyyy-mm-dd");
		var CheckOutDate = dateFormat(req.params.checkoutdate, "yyyy-mm-dd");
		var NumOfAdults = req.params.numofadults;
		var HotelSearchBody = 
			'		<CityIds>\n\t\t\t' +
			'			<CityId>' + City[0].CityId + '</CityId>\n\t\t' +
			'		</CityIds>\n\t\t' +
			'		<CheckInDate>' + CheckInDate + '</CheckInDate>\n\t\t' +
			'		<CheckOutDate>' + CheckOutDate + '</CheckOutDate>\n\t\t' +
			'		<Rooms>\n\t\t\t' +
			'			<Room>\n\t\t\t\t' +
			'				<NumAdults>' + NumOfAdults + '</NumAdults>\n\t\t\t' +
			'			</Room>\n\t\t\t' +
//			'			<Room>\n\t\t\t\t' +
//			'				<NumAdults>' + IsChildren + '</NumAdults>\n\t\t\t\t' +
//			'				<Children>\n\t\t\t\t\t' +
//			'					<ChildAge>' + Child1Age + '</ChildAge>\n\t\t\t\t\t' +
//			'					<ChildAge>' + Child2Age + '</ChildAge>\n\t\t\t\t' +
//			'				</Children>\n\t\t\t' +
//			'			</Room>\n\t\t' +
			'		</Rooms>\n\t\t' +
			'		<Nationality>AU</Nationality>\n\t\t' +
//			'		<Currency>GBP</Currency>\n\t\t' +
			'		<AvailableOnly>1</AvailableOnly>\n\t';
		header = header.replace("REQUESTTYPE", "HotelSearch");
		header = header.replace("USERNAME", userName);
		header = header.replace("PASSWORD", password);

		helpers.performRequest('', 'POST', "HotelSearch", header, HotelSearchBody, function(data) {
			//console.log('Fetched ' + data.result.paging.total_items + ' Hotels');
			res.status(200).json(data);
			//response.writeHead(200, {'Content-Type': 'application/json'});
			//response.write(data);
			//response.end();
		});
      
	}).catch(err => {
      res.status(500).json(err);
	});
  },

  //Get an Hotels by the unique ID using model.findById()
  findHotelByHotelId(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
	console.log(req.params.hotelid);
	var Body = 
			'<HotelIds>' +
				'<HotelId>' + req.params.hotelid + '</HotelId>' +
			'</HotelIds>';
			
	header = header.replace("REQUESTTYPE", "GetHotelDetails");
	header = header.replace("USERNAME", userName);
	header = header.replace("PASSWORD", password);

	helpers.performRequest('', 'POST', "GetHotelDetails", header, Body, function(data) {
		//console.log('Fetched ' + data.result.paging.total_items + ' Hotels');
		res.status(200).json(data);
		//response.writeHead(200, {'Content-Type': 'application/json'});
		//response.write(data);
		//response.end();
	});
	
  }
};