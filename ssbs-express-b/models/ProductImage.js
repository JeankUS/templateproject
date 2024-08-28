module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
      idimage: {
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
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_by: {
        type: DataTypes.STRING(100),
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      modified_by: {
        type: DataTypes.STRING(100),
      },
      modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    }, {
      timestamps: false,
      tableName: 'product_images', // El nombre de la tabla en la base de datos
    });
  
    ProductImage.associate = function (models) {
      ProductImage.belongsTo(models.Product, {
        foreignKey: 'idproduct',
        as: 'product',
      });
    };
  
    return ProductImage;
  };
  