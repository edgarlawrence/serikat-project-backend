const express = require('express')
const db = require('./config/index')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const categoryRoutes = require('./routes/category')
const membersRoutes = require('./routes/members')
const cors = require('cors')
const app = express()

try {
    db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/news', routes);
app.use('/category', categoryRoutes);
app.use('/members', membersRoutes);
require('./routes/auth')(app);

app.use('/Images', express.static('./Images'));

app.listen(5000, () => console.log('Server running at port 5000'));