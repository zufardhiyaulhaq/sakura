const canvasTxt = require("canvas-txt").default;
const { loadImage } = require("canvas");

class Meetup {
  constructor(canvas, style) {
    this.canvas = canvas;
    this.style = style;
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
    drawText(this.canvas, this.title, this.style.titleStyle);
    drawText(this.canvas, this.description, this.style.titleDescriptionStyle);
    drawText(this.canvas, this.url, this.style.urlStyle);
  }

  async drawSponsors() {
    drawText(this.canvas, "In Partnership With", this.style.sponsorStyle.image);

    var sponsorCount = 0;
    for (var y = 0; y < this.style.sponsorBox.verticalDivider; y++) {
      for (var x = 0; x < this.style.sponsorBox.horizontalDivider; x++) {
        if (this.sponsors.length > sponsorCount) {
          const dx =
            this.style.sponsorBox.dx +
            this.style.sponsorStyle.image.width * x +
            this.style.sponsorStyle.image.padding * x;
          const dy =
            this.style.sponsorBox.dy +
            this.style.sponsorStyle.image.height * y +
            this.style.sponsorStyle.image.padding * y;

          await drawImage(
            this.canvas,
            this.sponsors[sponsorCount].image_path,
            dx,
            dy,
            this.style.sponsorStyle.image.width,
            this.style.sponsorStyle.image.height
          );

          sponsorCount++;
        }
      }
    }
  }

  async drawOrganizers() {
    drawText(this.canvas, "Organized By", this.style.organizerStyle.text);

    var organizerCount = 0;
    for (var y = 0; y < this.style.organizerBox.verticalDivider; y++) {
      for (var x = 0; x < this.style.organizerBox.horizontalDivider; x++) {
        if (this.organizers.length > organizerCount) {
          const dx =
            this.style.organizerBox.dx +
            this.style.organizerStyle.image.width * x +
            this.style.organizerStyle.image.padding * x;
          const dy =
            this.style.organizerBox.dy +
            this.style.organizerStyle.image.height * y +
            this.style.organizerStyle.image.padding * y;

          await drawImage(
            this.canvas,
            this.organizers[organizerCount].image_path,
            dx,
            dy,
            this.style.organizerStyle.image.width,
            this.style.organizerStyle.image.height
          );

          organizerCount++;
        }
      }
    }
  }

  async drawSpeakers() {
    var speakerCount = 0;
    for (var y = 0; y < this.style.speakerBox.verticalDivider; y++) {
      for (var x = 0; x < this.style.speakerBox.horizontalDivider; x++) {
        if (this.speakers.length > speakerCount) {
          const dxImage = this.style.speakerBox.dx + this.style.speakerStyle.image.width * x + this.style.speakerStyle.padding * x;
          const dyImage = this.style.speakerBox.dy + this.style.speakerStyle.image.height * y + 2 * (this.style.speakerStyle.padding * y);
          await drawImage(
            this.canvas,
            this.speakers[speakerCount].image_path,
            dxImage,
            dyImage,
            this.style.speakerStyle.image.width,
            this.style.speakerStyle.image.height
          );

          const nameStyle = this.style.speakerStyle.name;
          nameStyle.dx = dxImage + this.style.speakerStyle.image.width + 3 * this.style.speakerStyle.padding;
          nameStyle.dy = dyImage + this.style.speakerStyle.padding;
          drawText(this.canvas, this.speakers[speakerCount].name, nameStyle);

          const companyStyle = this.style.speakerStyle.company;
          companyStyle.dx = dxImage + this.style.speakerStyle.image.width + 3 * this.style.speakerStyle.padding;
          companyStyle.dy = nameStyle.dy + nameStyle.dHeight + this.style.speakerStyle.padding;
          drawText(
            this.canvas,
            `${this.speakers[speakerCount].position} @ ${this.speakers[speakerCount].company}`,
            companyStyle
          );

          const titleStyle = this.style.speakerStyle.title;
          titleStyle.dx = dxImage + this.style.speakerStyle.image.width + 3 * this.style.speakerStyle.padding;
          titleStyle.dy = companyStyle.dy + companyStyle.dHeight + this.style.speakerStyle.padding;
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
