// Dependencies
// =============================================================
var path = require("path");
var express = require("express");
var db = require("../models");

// Routes before passport
// =============================================================
module.exports = function (app) {

  // route loads home.handlebars
  app.get("/", function (req, res) {
    db.Opportunity.findAll({
      order: ["opportunity_name"]
    }).then(function (dbOpportunity) {
      var handlebarsData = {
        formData: {
          formName: "Volunteer Registration",
          formAction: "create",
          buttonName: "Sign Up",
          deactivateButton: '',
          usernameReadOnly: 'false',
          newEmail: "jDoe@email.com",
          emailFocus: "",
          newPassword: "",
          passwordFocus: '',
          lastName: "Doe",
          lastNameFocus: '',
          firstName: "Jane",
          firstNamefocus: '',
          phone: "555-555-1234",
          phoneFocus: '',
          selectInOrOut: "",
          cooking: "",
          gardening: "",
          painting: "",
          carpentry: "",
          plumbing: "",
          electrical: "",
          publicRelations: "",
          marketing: "",
          fundRaising: "",
          programming: "",
          sales: "",
          teaching: "",
        },
        opportunityData: {
          opportunities: dbOpportunity,
        }
      };
      res.render(path.join(__dirname, "../views/home.handlebars"), handlebarsData);
    });
  });

};