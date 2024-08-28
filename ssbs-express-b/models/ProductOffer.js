module.exports = (sequelize, DataTypes) => {
    const ProductOffer = sequelize.define('ProductOffer', {
      idoffer: {
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
      offer_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
      },
      description: {
        type: DataTypes.TEXT,
      }
    }, {
      timestamps: false,
      tableName: 'product_offers', // El nombre de la tabla en la base de datos
    });
  
    ProductOffer.associate = function (models) {
      ProductOffer.belongsTo(models.Product, {
        foreignKey: 'idproduct',
        as: 'product',
      });
    };
  
    return ProductOffer;
  };
  