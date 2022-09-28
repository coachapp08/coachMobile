const mysql = require("mysql");
const config = require("../../config/DBConfig");
const { cryptPassword, comparePassword } = require("../../utils/PasswordEncoder");
const pool = mysql.createPool(config);

async function CreateUserAdmin(req, res, next) {
const{ username, password } = req.body;
  pool.getConnection((err, connection) => {
  var sqlCheck = "select * from adminuser where username = ?";
  connection.query(sqlCheck, [username], function (errCheck, resultCheck) {
console.log(resultCheck);
console.log(resultCheck.length);
if(resultCheck.length == 0){
      cryptPassword(password, (errCrypt, hash) => {
      var sql = "INSERT INTO adminuser (username,password) VALUES(?,?)";
        connection.query(sql, [username, hash], function (err, result) {
          if (err) throw err;
            console.log(result);
            console.log(result.insertId)
            res.status(200).json({ isSuccessful: true, id: result.insertId });
      });
    });
}else{
 res.status(200).json({ msg: 'Already Exists.', issuccessful:false });
}
});
  });
};
async function LoginUserAdmin(req, res, next) {
  pool.getConnection((err, connection) => {
    let {password,username} = req.body;
    if (err) throw err;
    // console.log(data);
    connection.query("SELECT * FROM adminuser WHERE username = ? ", [username], function (err, result) {
      let data = result[0];
      console.log("result", result[0].password);
      console.log("password", password);
      if (err) throw err;
      // connection.release();                                                                                                                                                                                                                                           
      else {
        if (result.length > 0) {
          comparePassword( password, result[0].password, (err, isPasswordMatch) => {
            if (err) throw err;
            if (isPasswordMatch) {
              res.status(200).json({
                id: data.id,  username: data.username
              });
            }
            else {
              res.status(500).json({
                "error": "username and password does not match", issuccessful:false
              })
            }
          });
        }
      }
        });
  });
};
module.exports = {
    CreateUserAdmin,
    LoginUserAdmin
}