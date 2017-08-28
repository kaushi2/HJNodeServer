
module.exports = function(sequelize, Sequelize) {
    var Image = sequelize.define('Images', {
        HotelId: {
            primaryKey: true,
            type: Sequelize.INTEGER(11)
        },
        Image: {
            type: Sequelize.STRING(200),
        }
    }, {
        classMethods: {
            associate: function(models) {
                // define associations here
                Image.belongsTo(models.Hotels);
            }
        }
    });
    return Image;
}