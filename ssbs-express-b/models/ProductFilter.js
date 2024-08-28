module.exports = (sequelize, DataTypes) => {
    const ProductFilter = sequelize.define('ProductFilter', {
      idfilter: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      }
    }, {
      timestamps: false,
      tableName: 'product_filters', // El nombre de la tabla en la base de datos
    });
  
    ProductFilter.associate = function (models) {
      ProductFilter.hasMany(models.ProductFilterValue, {
        foreignKey: 'idfilter',
        as: 'filterValues',
      });
    };
  
    return ProductFilter;
  };
  