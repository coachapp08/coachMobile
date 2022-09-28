const express = require("express");
const userroutes = require('./routes/User');
const activityroutes = require('./routes/Activity');
const userdetailroutes = require('./routes/UserDetail');
const useractivityroutes = require('./routes/UserActivity');
const knowlegedatabaseroutes = require('./routes/KnowlegeDatabase');
const adminuserroutes = require('./routes/admin/AdminUser');
const adminuserdetailroutes = require('./routes/admin/AdminUserDetail');
const adminactivityroutes = require('./routes/admin/AdminActivity');

const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt')
// var cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());
app.use(express.json()); 
// app.use('/', function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//      res.end('Hello World');
// })
app.use('/User', userroutes);
app.use('/UserDetail', userdetailroutes)
app.use('/Activity', activityroutes);
app.use('/UserActivity', useractivityroutes);
app.use('/KnowlegeDatabase', knowlegedatabaseroutes);
app.use('/admin/AdminUser', adminuserroutes);
app.use('/admin/AdminUserDetail', adminuserdetailroutes);
app.use('/admin/AdminActivity', adminactivityroutes);


const listener = app.listen(process.env.PORT || 5000, () => {
    console.log('App is listening on port ' + listener.address().port)
})