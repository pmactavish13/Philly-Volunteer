var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  var Member = sequelize.define("Member", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
   state: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
   zip: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      },
    },
    inOrOut: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    cooking: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    gardening: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    painting: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    carpentry: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    plumbing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    electrical: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    publicRelations: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    marketing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    fundRaising: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    programming: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    sales: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    teaching: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  });

  return Member;
};