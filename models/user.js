const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Users',  // 테이블 이름을 'Users'로 지정
    timestamps: true,    // createdAt과 updatedAt 필드를 사용
  });

  // 비밀번호 해싱을 위한 Hook 설정
  User.beforeCreate(async (user, options) => {
    try {
      if (user.password) {
        const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    } catch (error) {
      console.error('비밀번호 해싱 중 오류 발생:', error);  // 에러 로그 추가
      throw error;  // 에러 발생 시 throw하여 상위에서 잡히도록 함
    }
  });

  User.beforeUpdate(async (user, options) => {
    if (user.password) {
      const bcrypt = require('bcrypt');
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  // 비밀번호 검증 메서드 추가
  User.prototype.validPassword = async function(password) {
    const bcrypt = require('bcrypt');
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
