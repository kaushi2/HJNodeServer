Hotel = require('../models/').Hotel;
Facility = require('../models/').Facility;
City = require('../models/').City;

module.exports = {
  //Get a list of all Hotels using model.findAll()
  index(req, res) {
    Hotel.findAll({
        where: {
          CityId: 2
        },
        limit: 10,
      })
      .then(function (hotels) {
        res.status(200).json(hotels);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Get an Hotel by the unique ID using model.findById()
  show(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    // Get the City Id from Name
    City.findAll({
      where: {
        CityName: req.params.city,
        CountryCode: 'AU'
      },
      attributes: ['CityId'],
      limit: 1
    }).then(City => {
      let limit = 10;
      let offset = 0;
      Hotel.findAndCountAll({
        where: {
          CityId: City[0].CityId
        }
      })
      .then((data) => { // findAndCountAll
        let page = req.params.page;  // Page Number from the route
        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        console.log('TotalRows: ' + data.count + '  TotalPages: ' + '  PageNo: ' + page + '  Offset: ' + offset);
        Hotel.findAll({
          where: {
            CityId: City[0].CityId
          },
          limit: limit || 10,
          offset: offset || 0,
          sort: {
            StarRating: 1
          }
        }).then(hotel => { // findAll
          res.status(200).json(hotel);
        }).catch(error => { // findAll
          res.status(500).json(error);
        });
      }).catch(error => { // findAndCountAll
        res.status(500).json(error);
      });
    }).catch(error => {
      res.status(500).json(error);
    });

  },

  //Get By City
  showByCity(req, res) {
    //Hotel.findAll({where()})
  },

  //Create a new Hotel using model.create()
  create(req, res) {
    Hotel.create(req.body)
      .then(function (newHotel) {
        res.status(200).json(newHotel);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Edit an existing Hotel details using model.update()
  update(req, res) {
    Hotel.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(function (updatedRecords) {
        res.status(200).json(updatedRecords);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Delete an existing Hotel by the unique ID using model.destroy()
  delete(req, res) {
    Hotel.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function (deletedRecords) {
        res.status(200).json(deletedRecords);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  }
};