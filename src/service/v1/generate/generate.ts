import { registerFont, createCanvas } from "canvas";
import { Meetup } from "../../../builder/builder";
const { writeFileSync } = require("fs");
import {
  v1GenerateRequest,
  v1GenerateResponse,
} from "../../../configs/configs";
import { Style } from "../../../styles/styles";
import { Settings, ImageHosting } from "../../../settings/settings";
var Minio = require("minio");

export const generate = async function (
  request: v1GenerateRequest,
  setting: Settings
): Promise<v1GenerateResponse> {
  const styleConfig = new Style()
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
  gradient.addColorStop(1.0, styleConfig.colourCombination.background.endColor);
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

  let data = "foo"
  const draw = async function () {
    await meetup.draw();
    const buffer = canvas.toBuffer("image/png");
    writeFileSync("./example/meetup-server.png", buffer);

    if (setting.sakuraImageHosting == ImageHosting.minio) {
      var base64data = new Buffer(buffer).toString("base64");

      var minioClient = new Minio.Client({
        endPoint: setting.sakuraMinioEndpoint,
        port: setting.sakuraMinioPort,
        useSSL: true,
        accessKey: setting.sakuraMinioAccessKey,
        secretKey: setting.sakuraMinioSecretKey,
      });

      minioClient.makeBucket(
        "sakura-bucket",
        "us-east-1",
        function (err) {
          if (err) return console.log("Error creating bucket.", err);
          console.log('Bucket created successfully in "us-east-1".');
        }
      );

      minioClient.putObject(
        "sakura-bucket",
        "test",
        base64data,
        function (err, objInfo) {
          if (err) {
            return console.log(err); // err should be null
          }
          console.log("Success", objInfo);
          data = objInfo.etag
        }
      );
    }
  };

  await draw();

  let response: v1GenerateResponse = {
    image_url: data,
  };
  return response;
};
