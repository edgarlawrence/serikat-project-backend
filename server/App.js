const express = require('express')
const db = require('./config/index')
const routes = require('./routes/index')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const categoryRoutes = require('./routes/category')
const membersRoutes = require('./routes/members')
const auths = require('./routes/auth')

const cors = require('cors')
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
const bodyParser = require('body-parser')
const app = express()
dotenv.config();

try {
    db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

// app.use(cors(corsOptions));
app.use(cors({
  credentials: true,
  origin: ["http://localhost:8080"]
  }))
// app.use(cors({ credentials:true, origin:'http://localhost:5000' }));
app.use(cookieParser());
app.use(express.json());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
})); 

app.use('/news', routes);
app.use('/category', categoryRoutes);
app.use('/members', membersRoutes);
app.use(auths);


app.use('/Images', express.static('./Images'));

app.listen(5000, () => console.log('Server running at port 5000'));