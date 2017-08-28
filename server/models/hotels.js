
module.exports = function(sequelize, Sequelize) {
    var Hotel = sequelize.define('hotels', {
        HotelId: {
            primaryKey: true,
            type: Sequelize.INTEGER(11)
        },
        CityId: {
            type: Sequelize.INTEGER(11),
            notEmpty: true
        },
        HotelName: {
            type: Sequelize.STRING(255)
        },
        StarRating: {
            type: Sequelize.INTEGER(11)
        },
        Latitude: {
            type: Sequelize.DOUBLE
        },
        Longitude: {
            type: Sequelize.DOUBLE
        },
        Address: {
            type: Sequelize.STRING(255)
        },
        Location: {
            type: Sequelize.STRING(255)
        },
        PhoneNumber: {
            type: Sequelize.DOUBLE
        },
        
    }, {
        classMethods: {
            associate: function(models) {
                Hotel.hasMany(models.Facilities, {
                    onDelete: 'cascade'
                });
                Hotel.hasMany(models.Images, {
                    onDelete: 'cascade'
                });
                Hotel.hasMany(models.Descriptions, {
                    onDelete: 'cascade'
                });
                Hotel.belongsTo(models.Cities);
            }
        }
    });

    return Hotel;

}