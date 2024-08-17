const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItems = require('./models/cart-items');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const { name } = require('ejs');
// const Cart = require('./models/cart');

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
User.hasOne(Cart);
Cart.belongsTo(User);

Product.belongsToMany(Cart, {through : CartItems});
Cart.belongsToMany(Product, {through : CartItems});


const port = 6500;

sequelize
.sync()
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
    return user.createCart();
})
.then(cart => {
    // console.log(cart);
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    });
})
.catch(err => {
    console.log(err);
});

