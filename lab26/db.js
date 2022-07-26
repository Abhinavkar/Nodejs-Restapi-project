//Imported
const mongoose = require("mongoose");
require("dotenv").config();

//Connect method connecting a databse
mongoose.connect(process.env.DB_URL, (err) => {
  if (!err) {
    console.log("Database Connection Sucessfully");
  } else {
    console.log("Error is connection" + err);
  }
});

module.exports = mongoose;
