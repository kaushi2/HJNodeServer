var qs = require("querystring");
var express = require("express");
var http = require("http");

var app = express();


app.get("/api/Search", function(req,res) {
    return HotelSearch();
});

app.listen(3000);
console.log("Node Server listening on 3000");

function HotelSearch () {
    var requestType = "HotelSearch";
    var options = {
    "method": "POST",
    "hostname": "xmldemo.travellanda.com",
    "port": null,
    "path": "/xmlv1",
    "headers": {
        "requesttype": requestType,
        "authorization": "Basic MWQzMGFiNTE3ZGQ3MGNkZDIxYzA2NDlhMGM0MjU1ZmQ6bVQ3QzBVeFJQZVZu",
        "cache-control": "no-cache",
        "postman-token": "6704f625-3148-6732-f497-ae5007b32b48",
        "content-type": "application/x-www-form-urlencoded"
    }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            return body.toString();
        });
    });

    req.write(qs.stringify({ xml: 
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        ' <Request>\n\t' +
        '	<Head>\n\t\t' +
        '		<Username>1d30ab517dd70cdd21c0649a0c4255fd</Username>\n\t\t' +
        '		<Password>mT7C0UxRPeVn</Password>\n\t\t' +
        '		<RequestType>' + requestType + '</RequestType>\n\t' +
        '	</Head>\n\t' +
        '	<Body>\n\t\t' +
        '		<CityIds>\n\t\t\t' +
        '			<CityId>117976</CityId>\n\t\t' +
        '		</CityIds>\n\t\t' +
        '		<CheckInDate>2017-12-12</CheckInDate>\n\t\t' +
        '		<CheckOutDate>2017-12-20</CheckOutDate>\n\t\t' +
        '		<Rooms>\n\t\t\t' +
        '			<Room>\n\t\t\t\t' +
        '				<NumAdults>2</NumAdults>\n\t\t\t' +
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
        '		<AvailableOnly>0</AvailableOnly>\n\t' +
        '	</Body>\n' +
        '</Request>' }));
    req.end();
}
