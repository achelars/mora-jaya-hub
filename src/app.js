const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');  

// Importing the routes
const authRoutes = require('./routes/api/auth');
const productRoutes = require('./routes/api/products');
const orderRoutes = require('./routes/api/orders');
const shippingRoutes = require('./routes/api/shipping');
const categoryApiRoutes = require('./routes/api/categories');
const categoryViewRoutes = require('./routes/views/category');
const customizationRoutes = require('./routes/api/customizations');
const promotionRoutes = require('./routes/api/promotions');
const paymentRoutes = require('./routes/api/payments');
const logRoutes = require('./routes/api/logs');
const homeRoutes = require('./routes/views/home');
const productDetailRoutes = require('./routes/views/product'); 
const featuredProductsRoutes = require('./routes/api/featuredProducts'); // New route

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));  

// View Routes
app.use('/', homeRoutes);
app.use('/category', categoryViewRoutes); 
app.use('/products', productDetailRoutes); 

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/categories', categoryApiRoutes);
app.use('/api/customizations', customizationRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/featuredProducts', featuredProductsRoutes); // Registering the new route

// Error handling for 404
app.use((req, res, next) => {
    res.status(404).render('404', { message: 'Page not found' });
});

// Error handling for 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { message: 'Internal Server Error' });
});

module.exports = app;
