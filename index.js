const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');
const routers = require('./interfaces/routers');

app.use(express.json());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routers);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
