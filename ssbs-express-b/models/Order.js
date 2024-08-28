module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      idorder: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      iduser: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user', // El nombre de la tabla en la base de datos
          key: 'iduser',
        },
        onDelete: 'CASCADE',
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isIn: [['pending', 'paid', 'shipped', 'completed', 'cancelled']]
        }
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
      tableName: 'orders', // El nombre de la tabla en la base de datos
    });
  
    Order.associate = function (models) {
      Order.belongsTo(models.User, {
        foreignKey: 'iduser',
        as: 'user',
      });
      Order.hasMany(models.OrderItem, {
        foreignKey: 'idorder',
        as: 'items',
      });
    };
  
    return Order;
  };
  