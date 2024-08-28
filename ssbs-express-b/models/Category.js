module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      idcategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
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
      tableName: 'categories', // El nombre de la tabla en la base de datos
    });
  
    Category.associate = function (models) {
      Category.hasMany(models.Product, {
        foreignKey: 'idcategory',
        as: 'products',
      });
    };
  
    return Category;
  };
  