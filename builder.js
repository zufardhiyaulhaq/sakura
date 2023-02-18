const canvasTxt = require("canvas-txt").default;
const { loadImage } = require("canvas");
const {
  titleStyle,
  titleDescriptionStyle,
  urlStyle,
  sponsorStyle,
  sponsorImageStyle,
  sponsorBox,
  speakerStyle,
  speakerBox,
  organizerStyle,
  organizerImageStyle,
  organizerBox,
} = require("./style");

class Meetup {
  constructor(canvas) {
    this.canvas = canvas;
    this.title = undefined;
    this.description = undefined;
    this.url = undefined;
    this.sponsors = undefined;
    this.speakers = undefined;
    this.organizers = undefined;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setDescription(date, time, location) {
    this.description = date + " | " + time + " | " + location;
    return this;
  }

  setURL(url) {
    this.url = url;
    return this;
  }

  setSponsors(sponsors) {
    this.sponsors = sponsors;
    return this;
  }

  setSpeakers(speakers) {
    this.speakers = speakers;
    return this;
  }

  setOrganizers(organizers) {
    this.organizers = organizers;
    return this;
  }

  async draw() {
    this.drawDescription();
    await this.drawSpeakers();
    await this.drawOrganizers();

    if (this.sponsors) {
      await this.drawSponsors();
    }
  }

  drawDescription() {
    drawText(this.canvas, this.title, titleStyle);
    drawText(this.canvas, this.description, titleDescriptionStyle);
    drawText(this.canvas, this.url, urlStyle);
  }

  async drawSponsors() {
    drawText(this.canvas, "In Partnership With", sponsorStyle);

    var sponsorCount = 0;
    for (var y = 0; y < sponsorBox.verticalDivider; y++) {
      for (var x = 0; x < sponsorBox.horizontalDivider; x++) {
        if (this.sponsors.length > sponsorCount) {
          const dx =
            sponsorBox.dx +
            sponsorImageStyle.width * x +
            sponsorImageStyle.padding * x;
          const dy =
            sponsorBox.dy +
            sponsorImageStyle.height * y +
            sponsorImageStyle.padding * y;

          await drawImage(
            this.canvas,
            this.sponsors[sponsorCount].image_path,
            dx,
            dy,
            sponsorImageStyle.width,
            sponsorImageStyle.height
          );

          sponsorCount++;
        }
      }
    }
  }

  async drawOrganizers() {
    drawText(this.canvas, "Organized By", organizerStyle);

    var organizerCount = 0;
    for (var y = 0; y < organizerBox.verticalDivider; y++) {
      for (var x = 0; x < organizerBox.horizontalDivider; x++) {
        if (this.organizers.length > organizerCount) {
          const dx =
            organizerBox.dx +
            organizerImageStyle.width * x +
            organizerImageStyle.padding * x;
          const dy =
            organizerBox.dy +
            organizerImageStyle.height * y +
            organizerImageStyle.padding * y;

          await drawImage(
            this.canvas,
            this.organizers[organizerCount].image_path,
            dx,
            dy,
            organizerImageStyle.width,
            organizerImageStyle.height
          );

          organizerCount++;
        }
      }
    }
  }

  async drawSpeakers() {
    var speakerCount = 0;
    for (var y = 0; y < speakerBox.verticalDivider; y++) {
      for (var x = 0; x < speakerBox.horizontalDivider; x++) {
        if (this.speakers.length > speakerCount) {
          const dxImage =
            speakerBox.dx +
            speakerStyle.image.width * x +
            speakerStyle.padding * x;
          const dyImage =
            speakerBox.dy +
            speakerStyle.image.height * y +
            2 * (speakerStyle.padding * y);
          await drawImage(
            this.canvas,
            this.speakers[speakerCount].image_path,
            dxImage,
            dyImage,
            speakerStyle.image.width,
            speakerStyle.image.height
          );

          const nameStyle = speakerStyle.name;
          nameStyle.dx =
            dxImage + speakerStyle.image.width + 3 * speakerStyle.padding;
          nameStyle.dy = dyImage + speakerStyle.padding;
          drawText(this.canvas, this.speakers[speakerCount].name, nameStyle);

          const companyStyle = speakerStyle.company;
          companyStyle.dx =
            dxImage + speakerStyle.image.width + 3 * speakerStyle.padding;
          companyStyle.dy =
            nameStyle.dy + nameStyle.dHeight + speakerStyle.padding;
          drawText(
            this.canvas,
            `${this.speakers[speakerCount].position} @ ${this.speakers[speakerCount].company}`,
            companyStyle
          );

          const titleStyle = speakerStyle.title;
          titleStyle.dx =
            dxImage + speakerStyle.image.width + 3 * speakerStyle.padding;
          titleStyle.dy =
            companyStyle.dy + companyStyle.dHeight + speakerStyle.padding;
          drawText(this.canvas, this.speakers[speakerCount].title, titleStyle);

          speakerCount++;
        }
      }
    }
  }
}

const drawText = (ctx, text, style) => {
  ctx.fillStyle = style.fontColor;
  canvasTxt.font = style.fontType;
  canvasTxt.align = style.align;
  canvasTxt.vAlign = style.vAlign;
  canvasTxt.fontSize = style.fontSize;
  canvasTxt.fontWeight = style.fontWeight;
  canvasTxt.lineHeight = style.fontSize + style.fontSize * 0.1;
  canvasTxt.drawText(
    ctx,
    text,
    style.dx,
    style.dy,
    style.dWidth,
    style.dHeight
  );
};

const drawImage = async (ctx, image_path, dx, dy, width, height) => {
  const image = await loadImage(image_path);
  var scale = Math.min(width / image.width, height / image.height);
  ctx.drawImage(image, dx, dy, image.width * scale, image.height * scale);

  return {
    widthSubtrator: width - image.width * scale,
  };
};

module.exports = {
  Meetup,
};
