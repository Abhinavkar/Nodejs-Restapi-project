const app = require("./app");
const db = require("./db");
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`Server Running at port ${process.env.PORT}: `);
});
