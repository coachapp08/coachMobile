const mysql = require("mysql");
const config = require("../config/DBConfig");
const pool = mysql.createPool(config);

async function CreateUserActivity(req, res, next) {
  // console.log("req is ", req.body);
  const data = [ req.body.user_id, req.body.activity_id, req.body.timeduration,req.body.start_date,req.body.end_date ];
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query("INSERT INTO useractivity (user_id,activity_id,timeduration,start_date,end_date) VALUES(?,?,?,?,?)", data, (usererr, result) => {
      if (usererr) {
        res.status(500).json({ msg: "Data does not exists." });
      }
      else {
        console.log(result);
        console.log(result.insertId)
        
        res.status(200).json({ id: result.insertId, isSuccessful: true });
      }
    });
   });
};
async function CreateUserActivityDone(req, res, next) {
  const data = [ req.body.user_id, req.body.activity_id, req.body.task_date, req.body.completion_status, req.body.completion_time];
  pool.getConnection(function (err, connection) {
    if (err) throw err;
     connection.query("INSERT INTO activitydone (user_id,activity_id,task_date,completion_status,completion_time) VALUES(?,?,?,?,?)", data, (usererr, result) => {
      if (usererr) {
        res.status(500).json({ msg: "Data does not exists." });
      }
      else {
        console.log(result);
        console.log(result.insertId)
        res.status(200).json({ id: result.insertId, isSuccessful: true });
      }
    });
   });
};
async function UpdateUserActivity(req, res, next) {
  const data = [req.body.user_id,req.body.activity_id,req.body.timeduration,req.body.start_date,req.body.end_date,req.body.id];
  pool.getConnection((err, connection) => {
    if (err) throw err;
     connection.query("UPDATE useractivity SET user_id = ?, activity_id = ?, timeduration = ?, start_date = ?, end_date = ? WHERE id = ? ", data, (usererr,result) => {
        if (usererr) {
        res.status(500).json({ msg: "Database is not responding." });
      }
      else {
          res.status(200).send({ result, isSuccessfull: true });
      }
    })
  });
};   
async function UpdateUserActivityDone(req, res, next) {
  const data = [req.body.user_id,req.body.activity_id,req.body.task_date,req.body.completion_status,req.body.completion_time,req.body.completion_id];
  pool.getConnection((err, connection) => {
    if (err) throw err;
     connection.query("UPDATE activitydone SET user_id = ?, activity_id = ?, task_date = ?, completion_status = ?, completion_time = ? WHERE completion_id = ? ", data, (usererr,result) => {
        if (usererr) {                        
        res.status(500).json({ msg: "Database is not responding." });
      }
      else {
          res.status(200).send({ result, isSuccessfull: true });
      }
    })
  });
};   
async function UpdateActivityStatus(req, res, next) {
  const data = [req.body.completion_status,req.body.completionid];
  pool.getConnection((err, connection) => {
    if (err) throw err;
     connection.query("UPDATE activitydone  SET completion_status = ?, completion_time = now() WHERE completionid = ? ", data, (usererr,result) => {
       if (usererr) {
         res.status(500).json({ msg: "Database is not responding." });
       }
      else {
          res.status(200).send({ result, isSuccessfull: true });
       }
     })
  });
};   
async function getBindUserActivity(req, res, next) {
  const { user_id } = req.body;
  pool.getConnection((err, connection) => {
     if (err) throw err;
    connection.query("SELECT distinct a.activity_id,a.user_id,a.timeduration,a.start_date,a.end_date,b.name, b.imageurl, b.description FROM useractivity a LEFT JOIN  Activity b ON a.activity_id =  b.id WHERE a.user_id = ?", [user_id], (usererr, result) => {
      if (usererr) {
        res.status(500).json({ msg: "Database is not responding." });
      }
      else {
        res.status(200).send({result, isSuccessful: true});
      }
    })
  });
};
async function getUserActivity(req, res, next) {
  const { user_id } = req.body;
  pool.getConnection((err, connection) => {
     if (err) throw err;
    connection.query("SELECT distinct a.timeduration,a.start_date,a.end_date,b.name, b.imageurl, b.description,c.completion_status,c.completion_time,c.completionid FROM useractivity a LEFT JOIN  Activity b ON a.activity_id =  b.id  left join activitydone c on a.id = c.activity_id WHERE  a.user_id = ? and c.task_date = curdate()", [user_id], (usererr, result) => {
      if (usererr) {
        res.status(500).json({ msg: "Database is not responding." });
      }
      else {
        res.status(200).send({result, isSuccessful: true});
      }
    })
  });
};
async function getWeeklyActivity(req, res, next) {
  const { user_id,start_date,end_date} = req.body;
  pool.getConnection((err, connection) => {
     if (err) throw err;
    connection.query("SELECT distinct a.timeduration,a.start_date,a.end_date,b.name, b.imageurl, b.description,c.completion_status,c.completion_time,c.completionid FROM useractivity a LEFT JOIN  Activity b ON a.activity_id =  b.id  left join activitydone c on a.id = c.activity_id WHERE  c.user_id = ? and weekday(a.start_date) <= ? and weekday(a.end_date) >= ? ", [user_id,start_date,end_date], (usererr, result) => {
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
  CreateUserActivity,
  CreateUserActivityDone,
  UpdateUserActivity,
  UpdateUserActivityDone,
  UpdateActivityStatus,
  getBindUserActivity,
  getUserActivity,
  getWeeklyActivity
}
// 13:29:44	SELECT distinct a.timeduration,a.start_date,a.end_date,b.name, b.imageurl, b.description,c.completion_status,c.completion_time,c.completionid  FROM useractivity a LEFT JOIN  Activity b ON a.activity_id =  b.id  left join activitydone c on a.id = c.activity_id WHERE  c.user_id = '6' and  c.task_date > DATE_SUB(NOW(), INTERVAL 5 WEEK) GROUP BY WEEK(c.task_date) ORDER BY c.task_date LIMIT 0, 1000	Error Code: 1055. Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'coachapp_db.a.timeduration' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by	0.00076 sec
