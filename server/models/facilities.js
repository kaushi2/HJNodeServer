module.exports = function(sequelize, Sequelize) {
    var Facility = sequelize.define('Facilities', {
        HotelId: {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        FacilityType: {
            type: Sequelize.STRING,
        },
        FacilityName: {
            type: Sequelize.STRING,
        }
    }, {
        classMethods: {
            associate: function(models) {
                // define associations here
                Facility.belongsTo(Hotel);
            }
        }
    });
    return Facility;
}