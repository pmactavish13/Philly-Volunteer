# project
 A full-stack Philadelphia Volunteer app matching organizations to volunteers. Designed using MVC (model view controller) pattern for efficient code reuse.

The app opens to the sign-in section of the home page. 

New users can fill out a form to join Philadelphia Volunteer.  In this form, there is also survey to track any special skills and indoor/outdoor preference.

After joining or logging in, the user is taken to an privte page.  The nav bar gives the user the option of adding an opportunity of their own, viewing/changing their profile, viewing the events they have created or logging out.  A row of buttons below the nav bar allows the user to change the search criteria to see opportunities where certian skills are required or needed.  

If the member chooses an opportunity to participate in, they can click on s button to sign-up for the opportunity.

mySQL database is used to keep track of all members and opportunities.  Two tables, Member and Opportunity are linked with a belongsToMany relationship creating a third MemberOpportunity table that can be used to see which members signed up or created which events.

**************************** Technology *****************************

Front end:
    Start Bootstrap
    HTML
    CSS
    Bootstrap 4.0    

Back end:
    MySQL database,
    MySQL workbench,
    Node.js,
    Express npm,
    Express-Handlebars npm,
    Body-Parser npm,
    Path npm,
    mysql2 npm,
    Sequelize npm,
    Passport npm,
    Passport-local npm,
    bcrypt-nodejs npm,
    Express-session npm

**************************** Developers *****************************

Anthony Elliot

Paula MacTavish

Alexa Stefanou 

Dirk Wiggins