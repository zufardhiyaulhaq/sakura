const { flayerPotrait, flayerLandscape, square, NewFlayerPotraitCanvasStyle } = require("./canvas/canvas");
const { openSans } = require("./fonts/fonts");
const { teal, black, white } = require("./colours/colours");

class Style {
  constructor() {
    this.canvasType = undefined;
    this.fontFamily = undefined;
    this.colourCombination = undefined;
    this.SponsorNumber = undefined;
    this.SpeakerNumber = undefined;
    this.OrganizerNumber = undefined;
  }

  setCanvasType(canvasType) {
    switch (canvasType) {
      case "flayer_potrait":
        this.canvasType = flayerPotrait;
        break;
      case "flayer_landscape":
        this.canvasType = flayerLandscape;
        break;
      case "square":
        this.canvasType = square;
        break;
      default:
        this.canvasType = flayerPotrait;
    }

    return this
  }

  setFontFamily(fontFamily) {
    switch (fontFamily) {
      case "opensans":
        this.fontFamily = openSans;
        break;
      default:
        this.fontFamily = openSans;
    }

    return this
  }

  setColourCombination(colourCombination) {
    switch (colourCombination) {
      case "teal":
        this.colourCombination = teal;
        break;
      case "black":
        this.colourCombination = black;
        break;
      case "white":
        this.colourCombination = white;
        break;
      default:
        this.colourCombination = black;
    }

    return this
  }

  setSponsorNumber(sponsorNumber) {
    this.SponsorNumber = sponsorNumber
    return this
  }

  setSpeakerNumber(speakerNumber) {
    this.SpeakerNumber = speakerNumber
    return this
  }

  setOrganizerNumber(organizerNumber) {
    this.OrganizerNumber = organizerNumber
    return this
  }

  validate() {
    if (this.canvasType.maxOrganizerNumber < this.OrganizerNumber) {
      throw new Error(`Organizer number cannot more than ${this.canvasType.maxOrganizerNumber} for canvas type ${this.canvasType.name}`);
    }

    if (this.canvasType.maxSpeakerNumber < this.SpeakerNumber) {
      throw new Error(`Speaker number cannot more than ${this.canvasType.maxSpeakerNumber} for canvas type ${this.canvasType.name}`)
    }

    if (this.canvasType.maxSponsorNumber < this.SponsorNumber) {
      throw new Error(`Sponsor number cannot more than ${this.canvasType.maxSponsorNumber} for canvas type ${this.canvasType.name}`)
    }

    return this
  }
  
  build() {
    var style = {
      canvasType: this.canvasType,
      canvasStyle: NewFlayerPotraitCanvasStyle(this.canvasType.speakerSizeMultiplier[this.SpeakerNumber], this.fontFamily, this.colourCombination),
      fontFamily: this.fontFamily,
      colourCombination: this.colourCombination
    }

    return style
  }
}

module.exports = {
  Style
};
