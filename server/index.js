const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const data = require('./database.json')


app.get("/api", (req, res) => {
  res.send(JSON.stringify(data));
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
