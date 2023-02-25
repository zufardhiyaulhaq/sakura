import express from "express";
import { v1GenerateRequest, v1GenerateResponse } from "../../configs/configs";

export const Router = express.Router();

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
Router.post("/generate", function (request, response) {
  let config: v1GenerateRequest = request.body
  console.log(config)

  let responseBody: v1GenerateResponse = {
    image_url: "foo"
  }
  response.json(responseBody);
});
