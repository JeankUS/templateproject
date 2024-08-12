module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      iduser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      mobile: {
        type: DataTypes.STRING(8),
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
      },
    }, {
      timestamps: false,
      tableName: 'user',
    });
  
    User.associate = function(models) {
      User.hasOne(models.Login, {
        foreignKey: 'iduser',
        as: 'login',
      });
  
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: 'iduser',
        otherKey: 'idrole',
        as: 'roles',
      });
    };
  
    return User;
  };
  