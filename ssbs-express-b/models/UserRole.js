module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
      iduser: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'iduser',
        },
        onDelete: 'CASCADE',
      },
      idrole: {
        type: DataTypes.INTEGER,
        references: {
          model: 'roles',
          key: 'idrole',
        },
        onDelete: 'CASCADE',
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
      tableName: 'user_role',
    });
  
    return UserRole;
  };
  