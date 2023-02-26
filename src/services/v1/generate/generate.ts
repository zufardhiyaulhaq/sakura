import { registerFont, createCanvas } from "canvas";
import { Meetup } from "../../../drawer/drawer";
const { writeFileSync } = require("fs");
import { v1GenerateRequest, v1GenerateResponse } from "../../../models/models";
import { Style } from "../../../styles/styles";
import { Settings, ImageHosting } from "../../../settings/settings";
var Minio = require("minio");
import {
  NewGithubClient,
  GithubImageService,
} from "../../../image_services/github";
var crypto = require("crypto");

export const generate = async function (
  request: v1GenerateRequest,
  setting: Settings
): Promise<v1GenerateResponse> {
  try {
    let styleConfig = new Style()
      .setCanvasType(request.canvas_type)
      .setFontFamily(request.font_family)
      .setColourCombination(request.colour_combination)
      .setOrganizerNumber(request.meetup.organizers.length)
      .setSpeakerNumber(request.meetup.speakers.length)
      .setSponsorNumber(request.meetup.sponsors.length)
      .validate()
      .build();

    for (let font of styleConfig.fontFamily.fonts) {
      registerFont(font.path, {
        family: styleConfig.fontFamily.family,
        weight: font.weight,
      });
    }

    const width = styleConfig.canvasType.width;
    const height = styleConfig.canvasType.height;

    const canvas = createCanvas(width, height);
    const canvasContext = canvas.getContext("2d");

    let gradient = canvasContext.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(
      0.0,
      styleConfig.colourCombination.background.startColor
    );
    gradient.addColorStop(
      1.0,
      styleConfig.colourCombination.background.endColor
    );
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(0, 0, width, height);

    const meetup = new Meetup(canvasContext, styleConfig.canvasStyle)
      .setTitle(request.meetup.name)
      .setDescription(
        request.meetup.date,
        request.meetup.time,
        request.meetup.place
      )
      .setURL(request.meetup.registration_url)
      .setSpeakers(request.meetup.speakers)
      .setOrganizers(request.meetup.organizers);

    if (request.meetup.sponsors) {
      if (request.meetup.sponsors.length > 0) {
        meetup.setSponsors(request.meetup.sponsors);
      }
    }

    let url: string;
    const draw = async function () {
      await meetup.draw();
      const buffer = canvas.toBuffer("image/png");

      if (setting.sakuraImageHosting == ImageHosting.minio) {
        // TODO finish minio
        var base64data = new Buffer(buffer).toString("base64");

        var minioClient = new Minio.Client({
          endPoint: setting.sakuraMinioEndpoint,
          port: setting.sakuraMinioPort,
          useSSL: true,
          accessKey: setting.sakuraMinioAccessKey,
          secretKey: setting.sakuraMinioSecretKey,
        });
      }

      if (setting.sakuraImageHosting == ImageHosting.github) {
        let client = NewGithubClient({
          token: setting.SakuraGithubToken,
        });

        let githubHandler = new GithubImageService(client, {
          username: setting.SakuraGithubUsername,
          repository: setting.SakuraGithubRepository,
          directory: setting.SakuraGithubDirectory,
        });

        let objInfo = await githubHandler.upload(
          buffer,
          `${crypto.randomBytes(20).toString("hex")}.png`
        );
        url = objInfo.url;
      }
    };

    await draw();

    let response: v1GenerateResponse = {
      image_url: url,
      response_code: 200,
      error_message: "",
    };
    return response;
  } catch (err) {
    return {
      image_url: "",
      response_code: 422,
      error_message: err.message,
    };
  }
};
