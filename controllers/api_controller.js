// Dependencies
// =============================================================
var path = require("path");
var express = require("express");
var db = require("../models");

// api calls - with sign-in/sign-up authentication and continued passport 
//     authentication once user is signed into private areas of the app
// =============================================================

module.exports = function (app, passport) {

    // register new member
    app.post('/api/signup',
        passport.authenticate('local-signup', {
            failWithError: true
        }),
        (req, res, next) => {
            res.status(200).send({
                redirectTo: '/private'
            });
        },
        (err, req, res, next) => {
            console.log(err);
            res.status(500).send(err);
        });

    // member profile - calls data and allows changes
    app.put('/api/signup', isLoggedIn, function (req, res) {
        var data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            inOrOut: req.body.inOrOut,
            cooking: req.body.cooking,
            gardening: req.body.gardening,
            painting: req.body.painting,
            carpentry: req.body.carpentry,
            plumbing: req.body.plumbing,
            electrical: req.body.electrical,
            publicRelations: req.body.publicRelations,
            marketing: req.body.marketing,
            fundRaising: req.body.fundRaising,
            programming: req.body.programming,
            sales: req.body.sales,
            teaching: req.body.teaching,
        };
        db.Member.update(data, {
            where: {
                id: req.user.id
            },
            returning: true,
            plain: true
        })
            .then(function (result) {
                res.status(200).send({
                    redirectTo: '/private'
                });
            });
    });

    //authenticates member log in
    app.post(
        '/api/signin',
        passport.authenticate('local-signin', {
            failWithError: true
        }),
        (req, res, next) => {
            res.status(200).send({
                redirectTo: '/private'
            });
        },
        (err, req, res, next) => {
            console.log(err);
            res.status(500).send(err);
        });

    // gets opportunities based on filter - all, one or many parameters
    app.get("/private", isLoggedIn, function (req, res) {

        console.log(req.query);

        let searchFilter = req.query.skillsSearch || []

        if (typeof searchFilter === 'string')
            searchFilter = [searchFilter]

        const filter = searchFilter.reduce((acc, keyname) => {
            if (['Inside', 'Outside'].includes(keyname))
                acc['opportunity_inOrOut'] = acc['opportunity_inOrOut'] ? 'Both' : keyname
            else
                acc[keyname] = true
            return acc;
        }, {})
        console.log(filter)
        db.Opportunity.findAll({
            where: filter,
            include: {
                model: db.Member,
            }
        }).then(function (DbOpporunities) {
            var allOpportunities = [];
            for (i = 0; i < DbOpporunities.length; i++) {
                var newOpportunity = {
                    id: DbOpporunities[i].id,
                    opportunity_name: DbOpporunities[i].opportunity_name,
                    tag_line: DbOpporunities[i].tag_line,
                    opportunity_date: DbOpporunities[i].opportunity_date,
                    opportunity_start_time: DbOpporunities[i].opportunity_start_time,
                    opportunity_end_time: DbOpporunities[i].opportunity_end_time,
                    organization_address: DbOpporunities[i].organization_address,
                    organization_city: DbOpporunities[i].organization_city,
                    organization_state: DbOpporunities[i].organization_state,
                    organization_zip: DbOpporunities[i].organization_zip,
                    opportunity_photo_Url: DbOpporunities[i].opportunity_photo_Url,
                };
                for (j = 0; j < DbOpporunities[i].Members.length; j++) {
                    if (DbOpporunities[i].Members[j].id == req.user.id) {
                        newOpportunity.registered = true;
                    } else {
                        newOpportunity.registered = false;
                    }
                }
                allOpportunities.push(newOpportunity);
            }
            var handlebarsData = {
                formData: {
                    formName: "My Profile",
                    formAction: "update",
                    buttonName: "Update",
                    deactivateButton: '<button id="deactivate" data-id="' + req.user.id + '" class="btn btn-primary btn-xl text-uppercase" value="deactivate">Deactivate</button>',
                    usernameReadOnly: 'readonly',
                    newEmail: req.user.email,
                    emailFocus: req.user.email,
                    newPassword: "•••••••••",
                    passwordFocus: "•••••••••",
                    lastName: req.user.last_name,
                    lastNameFocus: req.user.last_name,
                    firstName: req.user.first_name,
                    firstNameFocus: req.user.first_name,
                    phone: req.user.phone,
                    phoneFocus: req.user.phone,
                    selectInOrOut: req.user.inOrOut,
                    cooking: req.user.cooking ? "checked" : "",
                    gardening: req.user.gardening ? "checked" : "",
                    painting: req.user.painting ? "checked" : "",
                    carpentry: req.user.carpentry ? "checked" : "",
                    plumbing: req.user.plumbing ? "checked" : "",
                    electrical: req.user.electrical ? "checked" : "",
                    publicRelations: req.user.publicRelations ? "checked" : "",
                    marketing: req.user.marketing ? "checked" : "",
                    fundRaising: req.user.fundRaising ? "checked" : "",
                    programming: req.user.programming ? "checked" : "",
                    sales: req.user.sales ? "checked" : "",
                    teaching: req.user.teaching ? "checked" : "",
                },
                opportunityData: {
                    opportunities: allOpportunities,
                }
            };
            res.render(path.join(__dirname, "../views/private.handlebars"), handlebarsData);
            //res.json(allOpportunities);
        });
    });

    // gets all events associated with a specific member
    app.get("/myEvents", isLoggedIn, function (req, res) {
        db.Opportunity.findAll({
            include: {
                model: db.Member,
                where: {
                    id: req.user.id
                }
            }
        }).then(opportunities => {
            const handlebarsData = {
                opportunityData: {
                    opportunities
                }
            }
            console.log(handlebarsData)
            res.render(path.join(__dirname, "../views/my_events.handlebars"), handlebarsData);
        })
    })

    // new_opportunities route loads new_opportunities.handlebars
    app.get("/new_opportunities", isLoggedIn, function (req, res) {
        res.render(path.join(__dirname, "../views/new_opportunities.handlebars"));
    });

    //create a new opportunity
    app.post('/api/new_opportunities', isLoggedIn, function (req, res) {
        db.Opportunity.create(req.body).then(function (dbOpportunity) {
            if (!dbOpportunity) {
                res.status(500).send("unable to create new event");
            }
            if (dbOpportunity) {
                res.status(200).send({ redirectTo: '/private' });
            }
        });
    });

    // member quit - change status to inactive
    app.post('/api/unenroll/:id', isLoggedIn, function (req, res) {
        newMemberOpportunity = {
            MemberId: req.user.id,
            OpportunityId: parseInt(req.params.id)
        };

        db.Member.findOne({
            where: {
                id: req.user.id
            }
        }).then(function (member) {
            db.Opportunity.findAll({
                where: {
                    id: parseInt(req.params.id)
                }
            }).then(function (opportunity) {
                member.removeOpportunities(opportunity);
                res.status(200).send();
            });
        });
    });

    // member sign-up for an opportunity
    app.post('/api/register/:id', isLoggedIn, function (req, res) {
        newMemberOpportunity = {
            MemberId: req.user.id,
            OpportunityId: parseInt(req.params.id)
        };

        db.Member.findOne({
            where: {
                id: req.user.id
            }
        }).then(function (member) {
            db.Opportunity.findAll({
                where: {
                    id: parseInt(req.params.id)
                }
            }).then(function (opportunity) {
                member.addOpportunities(opportunity);
                res.status(200).send();
            });
        });
    });

    // logout, redirect to home page
    app.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    });

    // authentication after login/sign-up to continue on private pages
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }

}