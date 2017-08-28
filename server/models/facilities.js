
module.exports = function(sequelize, Sequelize) {
    var Facility = sequelize.define('facilities', {
        HotelId: {
            primaryKey: true,
            type: Sequelize.INTEGER(11)
        },
        FacilityType: {
            type: Sequelize.STRING(50),
        },
        FacilityName: {
            type: Sequelize.STRING(200),
        }
    }, {
        classMethods: {
            associate: function(models) {
                // define associations here
                Facility.belongsTo(models.Hotels);
            }
        }
    });
    return Facility;
}