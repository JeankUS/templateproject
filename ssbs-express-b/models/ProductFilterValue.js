module.exports = (sequelize, DataTypes) => {
    const ProductFilterValue = sequelize.define('ProductFilterValue', {
      idfilter_value: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idproduct: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products', // El nombre de la tabla en la base de datos
          key: 'idproduct',
        },
        onDelete: 'CASCADE',
      },
      idfilter: {
        type: DataTypes.INTEGER,
        references: {
          model: 'product_filters', // El nombre de la tabla en la base de datos
          key: 'idfilter',
        },
        onDelete: 'CASCADE',
      },
      value: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    }, {
      timestamps: false,
      tableName: 'product_filter_values', // El nombre de la tabla en la base de datos
    });
  
    ProductFilterValue.associate = function (models) {
      ProductFilterValue.belongsTo(models.Product, {
        foreignKey: 'idproduct',
        as: 'product',
      });
      ProductFilterValue.belongsTo(models.ProductFilter, {
        foreignKey: 'idfilter',
        as: 'filter',
      });
    };
  
    return ProductFilterValue;
  };
  