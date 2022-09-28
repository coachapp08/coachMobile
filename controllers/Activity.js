const mysql = require("mysql");
const config = require("../config/DBConfig");
const pool = mysql.createPool(config);

async function CreateActivity(req, res, next) {
  console.log("req is ", req.body);
  const data = [ req.body.name, req.body.imageurl, req.body.description];
  pool.getConnection(function (err, connection) {
    if (err) throw err;
   connection.query("INSERT INTO Activity (name,imageurl,description) VALUES(?,?,?)", data, (usererr, result) => {
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
async function getActivity(req, res, next) {
  const data = req.params.id;
  pool.getConnection((err, connection) => {
     if (err) throw err;
    connection.query("SELECT name,imageurl,description FROM Activity WHERE id = ? ", data, (usererr, result) => {
      if (usererr) {
        res.status(500).json({ msg: "Database is not responding." });
      }
      else {
        res.status(200).send({result, isSuccessful: true});
      }
    })
  });
};
async function DeleteActivity(req, res, next) {
  const data = req.params.id;
  pool.getConnection((err, connection) => {
    if (err) throw err;
     connection.query( "DELETE  FROM Activity WHERE id = ? ", data, (usererr,result) => {
        if (usererr) {
        res.status(500).json({ msg: "Database is not responding." });
      }
      else {
        res.status(200).send({isSuccessful : true});
      }
    })
  });
};   
async function UpdateActivity(req, res, next) {
  const data = [req.body.name,req.body.imageurl,req.body.description,req.body.id];
  pool.getConnection((err, connection) => {
    if (err) throw err;
     connection.query("UPDATE Activity SET name = ?, imageurl = ?, description = ? WHERE id = ? ", data, (usererr,result) => {
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
  CreateActivity,
  getActivity,
  DeleteActivity,
  UpdateActivity
  }