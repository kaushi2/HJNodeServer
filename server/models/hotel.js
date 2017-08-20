module.exports = function(sequelize, Sequelize) {
    var Hotel = sequelize.define('Hotel', {
        HotelId: {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        CityId: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        HotelName: {
            type: Sequelize.STRING
        },
        StarRating: {
            type: Sequelize.INTEGER
        },
        Latitude: {
            type: Sequelize.DOUBLE
        },
        Longitude: {
            type: Sequelize.DOUBLE
        },
        Address: {
            type: Sequelize.STRING
        },
        Location: {
            type: Sequelize.STRING
        },
        PhoneNumber: {
            type: Sequelize.DOUBLE
        },
        
    }, {
        classMethods: {
            associate: function(models) {
                Hotel.hasMany(models.Facility, {
                    onDelete: 'cascade'
                });
            }
        }
    });

    return Hotel;

}