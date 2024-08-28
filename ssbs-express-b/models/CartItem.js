module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
      idcart_item: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idcart: {
        type: DataTypes.INTEGER,
        references: {
          model: 'carts', // El nombre de la tabla en la base de datos
          key: 'idcart',
        },
        onDelete: 'CASCADE',
      },
      idproduct: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products', // El nombre de la tabla en la base de datos
          key: 'idproduct',
        },
        onDelete: 'CASCADE',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    }, {
      timestamps: false,
      tableName: 'cart_items', // El nombre de la tabla en la base de datos
    });
  
    CartItem.associate = function (models) {
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'idcart',
        as: 'cart',
      });
      CartItem.belongsTo(models.Product, {
        foreignKey: 'idproduct',
        as: 'product',
      });
    };
  
    return CartItem;
  };
  