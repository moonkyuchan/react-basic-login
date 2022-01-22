const express = require("express");
const app = express();
const port = 4000;

app.listen(port, () => {
  console.log(`App listening port on ${port}`);
});
