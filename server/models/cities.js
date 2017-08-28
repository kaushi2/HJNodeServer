
module.exports = function(sequelize, Sequelize) {
    var City = sequelize.define('cities', {
        CityId: {
            primaryKey: true,
            type: Sequelize.INTEGER(11)
        },
        CityName: {
            type: Sequelize.STRING(50)
        },
        StateCode: {
            type: Sequelize.STRING(10)
        },
        CountryCode: {
            type: Sequelize.STRING(2)
        }
    }, {
        classMethods: {
            associate: function(models) {
                City.hasMany(models.Hotels, {
                    onDelete: 'cascade'
                });
            }
        }
    });

    return City;

}