const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const database = require('./util/database');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

database.execute('SELECT * FROM products;')
.then(result => {
    console.log(result);
})
.catch(err => {
    console.log('Database query error:', err);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const port = 8500;

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
