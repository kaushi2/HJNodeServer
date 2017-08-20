Hotel = require('../models/').Hotel;
Facility = require('../models/').Facilities;

module.exports= {
  //Get a list of all Hotels using model.findAll()
  index(req, res) {
    Hotel.findAll({
      include: Facility
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
    Hotel.findById(req.params.id, {
      include: Facility
    })
    .then(function (hotel) {
      res.status(200).json(hotel);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Create a new Hotel using model.create()
  create(req, res) {
    Hotel.create(req.body)
      .then(function (newHotel) {
        res.status(200).json(newHotel);
      })
      .catch(function (error){
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
    .catch(function (error){
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
    .catch(function (error){
      res.status(500).json(error);
    });
  }
};