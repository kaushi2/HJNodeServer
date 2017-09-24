var http = require("http");
var express = require("express");
var qs = require("querystring");
//var xml2js = require('xml2js');
var parseString = require('xml2js').parseString;

//var parser = new xml2js.Parser();

var host = "xmldemo.travellanda.com";
var port = null;
var path = "/xmlv1";
var userName = "1d30ab517dd70cdd21c0649a0c4255fd";
var password = "mT7C0UxRPeVn";
var header =
	'		<Username>USERNAME</Username>' +
	'		<Password>PASSWORD</Password>' +
	'		<RequestType>REQUESTTYPE</RequestType>';

var app = express();

module.exports = {
	performRequest(endpoint, method, requestType, body, success) {
		header = header.replace("REQUESTTYPE", requestType);
		header = header.replace("USERNAME", userName);
		header = header.replace("PASSWORD", password);

		var dataString = qs.stringify({
			xml: '<?xml version="1.0" encoding="UTF-8"?>\n' +
				' <Request>' +
				'	<Head>' +
				header +
				'	</Head>' +
				'	<Body>' +
				body +
				'	</Body>\n' +
				'</Request>'
		});

		var headers = {};

		if (method == 'GET') {
			endpoint += '?' + querystring.stringify(data);
		} else {
			headers = {
				'requesttype': requestType,
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(dataString)
			};
		}
		var options = {
			host: host,
			path: path,
			method: method,
			headers: headers
		};

		var req = http.request(options, function (res) {
			res.setEncoding('utf-8');

			var responseString = '';

			res.on('data', function (data) {
				//console.log(data);
				responseString += data;
			});

			res.on('end', function () {
				parseString(responseString, {
					explicitArray: false,
					mergeAttrs: true
				}, function (err, result) {
					//console.dir(JSON.stringify(result));
					if (requestType == 'HotelSearch') {
						success(result.Response.Body.Hotels.Hotel);
					}
					if (requestType == 'GetHotelDetails') {
						success(result.Response.Body.Hotels.Hotel);
					}
				});
				//success(responseString);
			});
		});

		req.write(dataString);
		req.end();
	},
};