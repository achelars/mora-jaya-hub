require('dotenv').config();

const app = require('./app'); 
const sequelize = require('./config/database');

// Import all models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Customization = require('./models/Customization');
const Promotion = require('./models/Promotion');
const OrderItem = require('./models/OrderItem');
const ProductCustomization = require('./models/ProductCustomization');
const Payment = require('./models/Payment');
const Shipping = require('./models/Shipping');
const Category = require('./models/Category');
const Log = require('./models/Log');

// Import associations after all models are defined
require('./models/associations');

const port = process.env.PORT || 3000;

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced successfully.');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });
