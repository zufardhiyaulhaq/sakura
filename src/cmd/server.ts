import express from "express";
import { Settings } from "../settings/settings";
import { v1GenerateRequest, v1GenerateResponse } from "../models/models";
import { generate } from "../services/v1/generate/generate";

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
    apis: ["**/*.ts"],
  };
  const specs = swaggerJsdoc(options);
  app.use("/api-docs", serve, setup(specs, { explorer: true }));

  /**
   * @openapi
   * /v1/generate:
   *   post:
   *     description: generate meetup poster
   *     operationId: v1Generate
   *     requestBody:
   *       description: meetup data
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/v1GenerateRequest'
   *       required: true
   *     responses:
   *       200:
   *         description: the created meetup poster
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/v1GenerateResponse'
   */
  app.use("/v1", express.json(), async function (request, response) {
    let config: v1GenerateRequest = request.body;
    let data: v1GenerateResponse = await generate(config, settings);
    
    response.statusCode = data.response_code
    response.json(data);
  });

  app.listen(settings.sakuraServerPort, settings.sakuraServerIP, () => {
    return console.log(
      `Sakura is listening at http://${settings.sakuraServerIP}:${settings.sakuraServerPort}`
    );
  });
};
