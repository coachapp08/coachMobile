const mysql = require("mysql");
const config = require("../../config/DBConfig");
const pool = mysql.createPool(config);

async function getUserDetailList(req, res, next) {
  const {StartIndex,EndIndex} = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("CALL GETUSERS(?,?) ", [StartIndex,EndIndex], (usererr, result)=>{
      if (usererr) {
        res.status(500).json({ msg: "Database is not responding." });
      }
      else {
        res.status(200).send({result, isSuccessful: true});
      }
    });
  }); 
};
module.exports = {
    getUserDetailList
}