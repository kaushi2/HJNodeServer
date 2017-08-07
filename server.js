var http = require("http");
var express = require("express");
var qs = require("querystring");
var parseString = require('xml2js').parseString;

var app = express();

var host = "xmldemo.travellanda.com";
var userName = "1d30ab517dd70cdd21c0649a0c4255fd";
var password = "mT7C0UxRPeVn";
var port = null;
var path = "/xmlv1";

var header = 
        '		<Username>USERNAME</Username>\n\t\t' +
        '		<Password>PASSWORD</Password>\n\t\t' +
        '		<RequestType>REQUESTTYPE</RequestType>\n\t';

app.get("/api/Search", function(req,response) {
    var HotelSearchBody = 
        '		<CityIds>\n\t\t\t' +
        '			<CityId>117976</CityId>\n\t\t' +
        '		</CityIds>\n\t\t' +
        '		<CheckInDate>2017-12-12</CheckInDate>\n\t\t' +
        '		<CheckOutDate>2017-12-20</CheckOutDate>\n\t\t' +
        '		<Rooms>\n\t\t\t' +
        '			<Room>\n\t\t\t\t' +
        '				<NumAdults>4</NumAdults>\n\t\t\t' +
        '			</Room>\n\t\t\t' +
        '			<Room>\n\t\t\t\t' +
        '				<NumAdults>1</NumAdults>\n\t\t\t\t' +
        '				<Children>\n\t\t\t\t\t' +
        '					<ChildAge>4</ChildAge>\n\t\t\t\t\t' +
        '					<ChildAge>6</ChildAge>\n\t\t\t\t' +
        '				</Children>\n\t\t\t' +
        '			</Room>\n\t\t' +
        '		</Rooms>\n\t\t' +
        '		<Nationality>FR</Nationality>\n\t\t' +
        '		<Currency>GBP</Currency>\n\t\t' +
        '		<AvailableOnly>1</AvailableOnly>\n\t';

    performRequest('', 'POST', "HotelSearch", HotelSearchBody, function(data) {
        //console.log('Fetched ' + data.result.paging.total_items + ' Hotels');
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(data);
        response.end();
        
    });
});

app.listen(3000);
console.log("Node Server listening on 3000");

function performRequest(endpoint, method, requestType, body, success) {
    header = header.replace("REQUESTTYPE", requestType);
    header = header.replace("USERNAME", userName);
    header = header.replace("PASSWORD", password);
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
            responseString += data;
        });

        res.on('end', function() {
            //console.log(responseString);
            parseString(responseString, {explicitArray: false}, function (err, result) {
                //console.dir(JSON.stringify(result));
                success(JSON.stringify(result));
            });
            //success(responseObject);
        });
    });

    req.write(dataString);
    req.end();
}


