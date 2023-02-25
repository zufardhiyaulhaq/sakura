import express from "express";
import { Settings } from "../settings/settings";
import { Router as v1Router } from "../routes/v1/routes";
import { serve, setup } from "swagger-ui-express";

const swaggerJsdoc = require("swagger-jsdoc");

export const start = function (settings: Settings) {
  const app = express();

  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Sakura",
        version: "1.0.0",
      },
    },
    apis: ['**/*.ts'],
  };
  const specs = swaggerJsdoc(options);
  app.use("/api-docs", serve, setup(specs, { explorer: true }));

  app.use("/v1", express.json(), v1Router);

  app.listen(settings.sakuraServerPort, settings.sakuraServerIP, () => {
    return console.log(
      `Sakura is listening at http://${settings.sakuraServerIP}:${settings.sakuraServerPort}`
    );
  });
};
