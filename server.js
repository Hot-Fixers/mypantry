const express = require('express');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Static directory
app.use(express.static('public'));

// Routes
require('./routes/pantry.js')(app);

// Requiring our models for syncing
const db = require('./models');

// Start app
(async () => {
    try {
        await db.sequelize.sync();
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    }
    catch (err) {
        throw err;
    };
})();
