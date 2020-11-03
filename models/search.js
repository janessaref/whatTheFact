// Creating our Search model for grabbing information from our API which are title, text/body, url link and the rating
module.exports = function(sequelize, DataTypes) {
    var Search = sequelize.define("Search", {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Search.associate = function(models) {
        // We're saying that a Search should belong to a User
        // A search can't be created without a User due to the foreign key constraint
        Search.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Search;
};