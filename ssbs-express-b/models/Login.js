module.exports = (sequelize, DataTypes) => {
  const Login = sequelize.define('Login', {
    idlogin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'iduser',
      },
      onDelete: 'CASCADE',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
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
    requires_change_pass: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: DataTypes.TRUE,
    }
  }, {
    timestamps: false,
    tableName: 'login',
  });

  Login.associate = function (models) {
    Login.belongsTo(models.User, {
      foreignKey: 'iduser',
      as: 'user',
    });
  };

  return Login;
};
