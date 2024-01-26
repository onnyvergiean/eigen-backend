const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routers = require('./interfaces/routers');
app.use(express.json());

app.use(routers);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
