module.exports = function(sequelize, Sequelize) {
    var City = sequelize.define('City', {
        CityId: {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        CityName: {
            type: Sequelize.STRING
        },
        
    }, {
        classMethods: {
            associate: function(models) {
                City.hasMany(models.Hotel, {
                    onDelete: 'cascade'
                });
            }
        }
    });

    return City;

}