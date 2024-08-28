module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
      idcart: {
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
      tableName: 'carts', // El nombre de la tabla en la base de datos
    });
  
    Cart.associate = function (models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'iduser',
        as: 'user',
      });
      Cart.hasMany(models.CartItem, {
        foreignKey: 'idcart',
        as: 'items',
      });
    };
  
    return Cart;
  };
  