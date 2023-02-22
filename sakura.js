const { registerFont, createCanvas } = require("canvas");
const { writeFileSync } = require("fs");
const { Meetup } = require("./builder");

const generate = (meetupConfig, styleConfig, outputFile) => {
  for (font of styleConfig.fontFamily.fonts) {
    registerFont(font.path, {
      family: styleConfig.fontFamily.family,
      weight: font.weight,
    });
  }

  const width = styleConfig.canvasType.width;
  const height = styleConfig.canvasType.height;

  const canvas = createCanvas(width, height);
  const canvasContext = canvas.getContext("2d");

  gradient = canvasContext.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0.0, styleConfig.colourCombination.background.startColor);
  gradient.addColorStop(1.0, styleConfig.colourCombination.background.endColor);
  canvasContext.fillStyle = gradient;
  canvasContext.fillRect(0, 0, width, height);

  const meetup = new Meetup(canvasContext, styleConfig.canvasStyle)
    .setTitle(meetupConfig.name)
    .setDescription(meetupConfig.date, meetupConfig.time, meetupConfig.place)
    .setURL(meetupConfig.registration_url)
    .setSpeakers(meetupConfig.speakers)
    .setOrganizers(meetupConfig.organizers);

  if (meetupConfig.sponsors) {
    if (meetupConfig.sponsors.length > 0) {
      meetup.setSponsors(meetupConfig.sponsors);
    }
  }

  const draw = async function () {
    await meetup.draw();
    const buffer = canvas.toBuffer("image/png");
    writeFileSync(outputFile, buffer);
  };

  draw();
};

module.exports = {
  generate,
};
