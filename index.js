const express = require('express');
const chalk = require('chalk');
const app = express();
const morgan = require('morgan');
const router = require('./routes/user_routes');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());
app.use(router);
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const port = 3001;

app.listen(port,()=>{
  console.log(chalk.bgGreenBright(`Server is running on port ${port}`));
});



