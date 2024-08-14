const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { name } = require('ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    });

})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints : true, onDelete : 'CASCADE'});
User.hasMany(Product);

const port = 6500;

sequelize.sync()
// .sync({force : true})
.then(() => {
    return User.findByPk(1);
})
.then(user => {
    if(!user) {
        return User.create({name: "Tarun", email: "tarun@gmail.com"});
    }
    return user;
})
.then(user => {
    // console.log(user);
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    });
})
.catch(err => {
    console.log(err);
});

