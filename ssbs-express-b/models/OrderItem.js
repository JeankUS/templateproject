module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      idorder_item: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idorder: {
        type: DataTypes.INTEGER,
        references: {
          model: 'orders', // El nombre de la tabla en la base de datos
          key: 'idorder',
        },
        onDelete: 'CASCADE',
      },
      idproduct: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products', // El nombre de la tabla en la base de datos
          key: 'idproduct',
        },
        onDelete: 'SET NULL',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    }, {
      timestamps: false,
      tableName: 'order_items', // El nombre de la tabla en la base de datos
    });
  
    OrderItem.associate = function (models) {
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'idorder',
        as: 'order',
      });
      OrderItem.belongsTo(models.Product, {
        foreignKey: 'idproduct',
        as: 'product',
      });
    };
  
    return OrderItem;
  };
  