const mysql = require("mysql");
const config = require("../config/DBConfig");
const pool = mysql.createPool(config);

async function CreateKnowlegeDatabase(req, res, next) {
  console.log("req is ", req.body);
  const data = [req.body.name,req.body.imageurl,req.body.pdfurl];
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query("INSERT INTO knowlegedatabase (name,imageurl,pdfurl) VALUES (?,?,?)", data, (usererr, result) => {
     c
      if (usererr) {
        res.status(500).json({ msg: "Data does not exists.", isSuccessfull: false });
      }
      else {
        console.log(result);
        console.log(result.insertId)
        
        res.status(200).json({ id: result.insertId, isSuccessful: true });
      }
    });
   });
}
async function getKnowlegeDatabase(req, res, next) {
  const data = req.body;
  pool.getConnection((err, connection) => {
     if (err) throw err;
    connection.query("SELECT * FROM knowlegedatabase order by id", data, (usererr, result) => {
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
  CreateKnowlegeDatabase,
  getKnowlegeDatabase
}