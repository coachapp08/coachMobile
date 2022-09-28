const mysql = require("mysql");
const config = require("../config/DBConfig");
const pool = mysql.createPool(config);

async function CreateUserDetail(req, res, next) {
  console.log("req is ", req.body);
  const data = [req.body.firstname,req.body.lastname,req.body.userid, req.body.dateofbirth, req.body.height, req.body.currentweight, req.body.targetweight, req.body.gender, req.body.address, req.body.imageurl];
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    
    connection.query("INSERT INTO userdetail (firstname,lastname,userid,dateofbirth,height,currentweight,targetweight,gender,address,imageurl) VALUES(?,?,?,?,?,?,?,?,?,?)", data, (err, result) => {
      if (err) {
        res.status(500).json({ msg: "User Date of birth does not exists.", isSuccessfull: false });
      }
      else {
        console.log(result);
        console.log(result.insertId)
        
        res.status(200).json({ id: result.insertId, isSuccessful: true });
      }
    });
   });
}
async function getUserDetail(req, res, next) {
  const data = req.params.id;
  pool.getConnection((err, connection) => {
     if (err) throw err;
     connection.query("SELECT a.id,a.userid,a.dateofbirth,a.height,a.currentweight,a.targetweight,a.gender,a.address,a.imageurl,a.firstname,a.lastname,b.emailid,b.phonenumber,b.username  FROM user b LEFT JOIN userdetail a ON a.userid = b.id where b.id = ? ", data, (usererr, result, feild) => {
      // connection.release();
      if (usererr) {
        res.status(500).json({ msg: "Database is not responding." });
      }
      else {
        res.status(200).send(result);
      }
    })
  });
};
async function UpdateUserDetail(req, res, next) {
   const data = [req.body.firstname, req.body.lastname, req.body.userid, req.body.dateofbirth, req.body.height, req.body.currentweight, req.body.targetweight, req.body.gender, req.body.address, req.body.imageurl, req.body.id];
  pool.getConnection((err, connection) => {
    if (err) throw err;
     connection.query("UPDATE userdetail SET firstname = ?, lastname = ?, userid = ?, dateofbirth = ?, height = ?, currentweight = ?, targetweight = ?, gender = ?, address = ?, imageurl = ? WHERE id = ? ", data, (usererr,result) => {
       if (usererr) {
         res.status(500).json({ msg: "Database is not responding." });
       }
      else {
          res.status(200).send({ result, isSuccessfull: true });
      }
    })
  });
};   
module.exports = {
  CreateUserDetail,
  getUserDetail,
  UpdateUserDetail
}