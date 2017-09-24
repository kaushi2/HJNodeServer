var helpers = require("../common");
var express = require("express");

module.exports = {
	HotelsByCityId(cityId, countryCode, checkInDate, checkOutDate, numOfAdults, numOfChildren, requestType) {
		// Get the City Id from Name
		console.log(checkInDate);
		var Body = 
			'		<CityIds>' +
			'			<CityId>' + cityId + '</CityId>' +
			'		</CityIds>' +
			'		<CheckInDate>' + checkInDate + '</CheckInDate>' +
			'		<CheckOutDate>' + checkOutDate + '</CheckOutDate>' +
			'		<Rooms>' +
			'			<Room>' +
			'				<NumAdults>' + numOfAdults + '</NumAdults>' +
			'			</Room>' +
//			'			<Room>' +
//			'				<NumAdults>' + numOfChildren + '</NumAdults>' +
//			'				<Children>' +
//			'					<ChildAge>' + Child1Age + '</ChildAge>' +
//			'					<ChildAge>' + Child2Age + '</ChildAge>' +
//			'				</Children>' +
//			'			</Room>' +
			'		</Rooms>' +
			'		<Nationality>AU</Nationality>' +
//			'		<Currency>GBP</Currency>' +
			'		<AvailableOnly>1</AvailableOnly>';
		return Body;
	},
	HotelByHotelId(hotelId, requestType) {
		var Body = 
				'<HotelIds>' +
					'<HotelId>' + hotelId + '</HotelId>' +
				'</HotelIds>';
		return Body;
	}
};