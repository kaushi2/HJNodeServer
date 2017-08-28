
module.exports = function(sequelize, Sequelize) {
    var Description = sequelize.define('descriptions', {
        HotelId: {
            primaryKey: true,
            type: Sequelize.INTEGER(11)
        },
        Description: {
            type: Sequelize.TEXT('long')
        }
    }, {
        classMethods: {
            associate: function(models) {
                // define associations here
                Description.belongsTo(models.Hotels);
            }
        }
    });
    return Description;
}