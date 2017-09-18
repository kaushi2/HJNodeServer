var http = require("http");
var express = require("express");
var qs = require("querystring");
//var xml2js = require('xml2js');
var parseString = require('xml2js').parseString;

//var parser = new xml2js.Parser();

var host = "xmldemo.travellanda.com";
var port = null;
var path = "/xmlv1";

var app = express();


module.exports = {
	performRequest(endpoint, method, requestType, header, body, success) {
		var dataString = qs.stringify({ xml: 
			'<?xml version="1.0" encoding="UTF-8"?>\n' +
			' <Request>\n\t' +
			'	<Head>\n\t\t' + 
					header +
			'	</Head>\n\t' +
			'	<Body>\n\t\t' +
					body +
			'	</Body>\n' +
			'</Request>' });
	  
		var headers = {};
	  
		if (method == 'GET') {
			endpoint += '?' + querystring.stringify(data);
		}
		else {
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

		var req = http.request(options, function(res) {
			res.setEncoding('utf-8');

			var responseString = '';

			res.on('data', function(data) {
				//console.log(data);
				responseString += data;
			});

			res.on('end', function() {
				parseString(responseString, {explicitArray: false, mergeAttrs: true}, function (err, result) {
					//console.dir(JSON.stringify(result));
					if(requestType == 'HotelSearch') {
						success(result.Response.Body.Hotels.Hotel);
					}
					if(requestType == 'GetHotelDetails') {
						success(result.Response.Body.Hotels.Hotel);
					}
				});
				//success(responseString);
			});
		});

		req.write(dataString);
		req.end();
	}
};