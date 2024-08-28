module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    idproduct: {
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
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idcategory: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories', // Nombre de la tabla en la base de datos
        key: 'idcategory',
      },
      onDelete: 'SET NULL',
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
    tableName: 'products', // Nombre de la tabla en la base de datos
  });

  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      foreignKey: 'idcategory',
      as: 'category',
    });
    Product.hasMany(models.ProductImage, {
      foreignKey: 'idproduct',
      as: 'images',
    });
    Product.hasMany(models.ProductOffer, {
      foreignKey: 'idproduct',
      as: 'offers',
    });
    Product.hasMany(models.ProductFilterValue, {
      foreignKey: 'idproduct',
      as: 'filterValues',
    });
  };

  return Product;
};
