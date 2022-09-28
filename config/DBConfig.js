const { DATABASENAME, DATABASEHOST, DATABASEPASSWORD, DATABASEUSER , DATABASETIMEZONE} = require("../utils/Constants");

const config = {
  host: DATABASEHOST,
  //socketPath: '/cloudsql/mavennft-bd03a:us-central1:maven-nft-db',
  user: DATABASEUSER,
  password: DATABASEPASSWORD,
  database: DATABASENAME,
  timezone: DATABASETIMEZONE
  }
  
module.exports = config;
 