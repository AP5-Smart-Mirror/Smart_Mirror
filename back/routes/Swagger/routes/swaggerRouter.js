var express = require('express');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("../components/swagger_comments.js")
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Smart Mirror API",
      description: "This API is used be our Smart Mirror to get all the data necessaries to display",
      contact: {
        name: "Amazing Developers"
      },
      servers: ["http://localhost:3000"]
    }
  },
  // ['.routes/*.js']
  apis: ["app.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
var router = express.Router();


/* GET auth callback. */

router.get('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;
