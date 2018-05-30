var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  var Opportunity = sequelize.define("Opportunity", {
    organization_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    about_organization: {
      type: DataTypes.STRING(1500),
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    opportunity_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    tag_line: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    organization_phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    organization_email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      },
    },
    opportunity_photo_Url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    organization_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organization_city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    organization_state: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    organization_zip: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    opportunity_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    opportunity_start_time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    opportunity_end_time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    opportunity_inOrOut: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    volunteers_needed: {
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

  return Opportunity;
};