var http = require("http");
var express = require("express");
var qs = require("querystring");
var parseString = require('xml2js').parseString;
var dateFormat = require('dateformat');
var models = require("../models");
var helpers = require("../common");
var commonHelpers = require("../common/commonHelpers");
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config')[env];

var sequelize = new Sequelize(config.database, config.username, config.password, config);

var app = express();

module.exports = {
	//Get a list of all Hotels using model.findAll()
	findHotelsByCityId(req, res) {
		res.header("Access-Control-Allow-Origin", "*");

		var CityName = req.params.city;
		var CountryCode = req.params.countrycode;
		var CheckInDate = dateFormat(req.params.checkindate, "yyyy-mm-dd");
		var CheckOutDate = dateFormat(req.params.checkoutdate, "yyyy-mm-dd");
		var NumOfAdults = req.params.numofadults;
		var NumOfChildren = req.params.numofchildren || 0;

		models.Cities.findAll({
			where: {
				CityName: CityName,
				CountryCode: CountryCode
			},
			attributes: ['CityId'],
			limit: 1
		}).then(City => { // Try for models.Cities.findAll
			console.log(City[0].CityId);
			var Body = commonHelpers.HotelsByCityId(City[0].CityId, CountryCode, CheckInDate, CheckOutDate, NumOfAdults, NumOfChildren, "HotelSearch");
			helpers.performRequest('', 'POST', "HotelSearch", Body, function (data) {
				//console.log('Fetched ' + data.result.paging.total_items + ' Hotels');
				res.status(200).json(data);
			});
		}).catch(err => { // Catch for models.Cities.findAll
			return err;
		});

	},

	//Get an Hotels by the unique ID using model.findById()
	findHotelByHotelId(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		console.log(req.params.hotelid);

		var HotelId = req.params.hotelid;

		var Body = commonHelpers.HotelByHotelId(HotelId, "GetHotelDetails");
		helpers.performRequest('', 'POST', "GetHotelDetails", Body, function (data) {
			//console.log('Fetched ' + data.result.paging.total_items + ' Hotels');
			res.status(200).json(data);
		});

	}

};