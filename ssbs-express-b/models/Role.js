module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
      idrole: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rolename: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING(50),
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
      tableName: 'roles',
    });
  
    Role.associate = function(models) {
      Role.belongsToMany(models.User, {
        through: models.UserRole,
        foreignKey: 'idrole',
        otherKey: 'iduser',
        as: 'users',
      });
    };
  
    return Role;
  };
  