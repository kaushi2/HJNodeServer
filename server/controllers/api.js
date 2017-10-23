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
var _ = require('Lodash');

var sequelize = new Sequelize(config.database, config.username, config.password, config);

var app = express(),
	bodyParser = require('body-parser');

var sendDataWhenReady = function (hotelDetailArray, hotelRoomsArray, res){
	if (hotelDetailArray == null || hotelRoomsArray == null){
		console.log("one of them was null");
		return;
	}
	//console.log(hotelDetailArray);
	//console.log(hotelRoomsArray);
	
	var hotel = _.find(hotelRoomsArray, { HotelId: hotelDetailArray.HotelId });
	hotelDetailArray.Options =hotel.Options;
	
	res.status(200).json(hotelDetailArray);
	/*
	var hotel;
	for (var i = 0, len = hotelRoomsArray.length; i < len; i++) {
		if (hotelRoomsArray[i].HotelId === hotelDetailArray.HotelId){
			hotel = hotelRoomsArray[i];
			break;
		}
	}
	hotelDetailArray.Options =hotel.Options;
	*/
	/*
	var mergedList = _.map(hotelDetailArray, function(item){
		return _.extend(item, _.find(hotelRoomsArray, { HotelId: item.HotelId }));
	});
	*/
};

module.exports = {
	findHotelsByCityId(req, res) {

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
	findHotelByHotelId(req, res) {

		var CityName = req.params.city;
		var CountryCode = req.params.countrycode;
		var CheckInDate = dateFormat(req.params.checkindate, "yyyy-mm-dd");
		var CheckOutDate = dateFormat(req.params.checkoutdate, "yyyy-mm-dd");
		var NumOfAdults = req.params.numofadults;
		var NumOfChildren = req.params.numofchildren || 0;
		var HotelId = req.params.hotelid;

		var HotelDetailArray;
		var HotelRoomsArray;

		var Body = commonHelpers.HotelByHotelId(HotelId, "GetHotelDetails");
		helpers.performRequest('', 'POST', "GetHotelDetails", Body, function (data) {
			 HotelDetailArray = data;
			 sendDataWhenReady(HotelDetailArray, HotelRoomsArray, res);
		});

		models.Cities.findAll({
			where: {
				CityName: CityName,
				CountryCode: CountryCode
			},
			attributes: ['CityId'],
			limit: 1
		}).then(City => { // Try for models.Cities.findAll
			var  Body1 = commonHelpers.HotelsByCityId(City[0].CityId, CountryCode, CheckInDate, CheckOutDate, NumOfAdults, NumOfChildren, "HotelSearch");
			helpers.performRequest('', 'POST', "HotelSearch", Body1, function (data1) {
				//console.log('Fetched ' + data.result.paging.total_items + ' Hotels');
				//HotelRoomsArray = HotelRoomsArray.replace('"HotelId"', 'HotelId');
				// Merge Results with Hotels Searched For
				
				HotelRoomsArray = data1;
				sendDataWhenReady(HotelDetailArray, HotelRoomsArray, res);
			});
		}).catch(err => { // Catch for models.Cities.findAll
			return err;
		});
	},
	getPolicyForOptionId(req, res) {

		var OptionId = req.params.optionid;

		var Body = commonHelpers.HotelPolicyByOptionId(OptionId, "HotelPolicies");
		helpers.performRequest('', 'POST', "HotelPolicies", Body, function (data) {
			//console.log('Fetched ' + data.result.paging.total_items + ' Hotels');
			res.status(200).json(data);
		});
	},
	bookForOptionIdRoomId(req, res) {

		var OptionId = req.params.optionid;
		var RoomId = req.params.roomid;
		
		var Body = commonHelpers.HotelBookingByOptionIdRoomId(OptionId, RoomId, req.body, "HotelBooking");
		helpers.performRequest('', 'POST', "HotelBooking", Body, function (data) {
			//console.log('Fetched ' + data.result.paging.total_items + ' Hotels');
			console.log(data);
			res.status(200).json(data);
		});
	}
};