const mysql = require("mysql");
const config = require("../config/DBConfig");
const { cryptPassword, comparePassword } = require("../utils/PasswordEncoder");
const pool = mysql.createPool(config);
// const io = require("socket.io")(http);
 


async function CreateUser(req, res, next) {
const{ password, emailid, phonenumber, username } = req.body;
  pool.getConnection((err, connection) => {
  var sqlCheck = "select * from user where username=? or emailid=?";
  connection.query(sqlCheck, [username,emailid], function (errCheck, resultCheck) {
console.log(resultCheck);
console.log(resultCheck.length);
if(resultCheck.length == 0){
      cryptPassword(password, (errCrypt, hash) => {
      var sql = "INSERT INTO user (password,emailid,phonenumber,username) VALUES(?,?,?,?)";
        connection.query(sql, [ hash, emailid, phonenumber, username], function (err, result) {
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
async function LoginUser(req, res, next) {
  pool.getConnection((err, connection) => {
    let {password,username} = req.body;
    if (err) throw err;
    // console.log(data);
    connection.query("SELECT * FROM user where username = ? or emailid = ? ", [username, username], function (err, result) {
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
                id: data.id, emailid: data.emailid, phonenumber: data.phonenumber, username: data.username
              });
            }
            else {
              res.send({
                "error": "Email and password does not match", issuccessful:false
              })
            }
          });
        }
      }
        });
  });
};

async function DeleteUser(req, res, next) {
  const data = req.params.id;
  pool.getConnection((err, connection) => {
    if (err) throw err;
     connection.query( "DELETE  FROM user WHERE id = ? ", data, (usererr,result) => {
        if (usererr) {
        res.status(500).json({ msg: "Database is not responding." });
      }
      else {
        res.status(200).send({isSuccessful : true});
      }
    })
  });
};   
   async function getTotalGoal(req, res, next) {
  const { user_id, start_date, end_date, completion_status } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
     connection.query("SELECT count(c.completion_status) as TotalGoalAchieved FROM useractivity a LEFT JOIN  Activity b ON a.activity_id =  b.id  LEFT JOIN  activitydone c ON a.id = c.activity_id   WHERE  c.user_id = ? and  a.start_date >= ? and a.end_date <= ?  and c.completion_status = ?", [user_id,start_date,end_date,completion_status], (usererr, result) => {
      // connection.release();
      if (usererr) {
        res.status(500).json({ msg: "Database is not responding." });
      }
      else {
        res.status(200).send({result, isSuccessful: true});
      }
    })
  });
};
async function getCurrentGoal(req, res, next) {
  const { user_id, task_date, completion_status } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
     connection.query("SELECT count(c.completion_status) as TotalGoalAchieved FROM useractivity a LEFT JOIN  Activity b ON a.activity_id =  b.id  left join activitydone c on a.id = c.activity_id WHERE  a.user_id = ? and c.task_date = ? and completion_status = ?", [user_id,task_date,completion_status], (usererr, result) => {
      // connection.release();
      if (usererr) {
        res.status(500).json({ msg: "Database is not responding." });
      }
      else {
        res.status(200).send({result, isSuccessful: true});
      }
    })
  });
};

module.exports = {
  CreateUser,
  DeleteUser,
  LoginUser,
  getTotalGoal, 
  getCurrentGoal
}
