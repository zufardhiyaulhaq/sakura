const { NewFlayerPotraitCanvasStyle } = require("./flayer_potrait");

const flayerPotrait = {
    name: "flayer_potrait",
    width: 2480,
    height: 3508,
    maxSponsorNumber: 4,
    maxSpeakerNumber: 4,
    maxOrganizerNumber: 4,
    speakerSizeMultiplier: {
      "4": 3,
      "3": 4,
      "2": 5,
      "1": 6,
    }
  };
  
  const flayerLandscape = {
    name: "flayer_landscape",
    width: 3508,
    height: 2480,
    maxSponsorNumber: 4,
    maxSpeakerNumber: 4,
    maxOrganizerNumber: 4
  };
  
  const square = {
    name: "square",
    width: 2048,
    height: 2048,
    maxSponsorNumber: 4,
    maxSpeakerNumber: 4,
    maxOrganizerNumber: 4
  };
  
  module.exports = {
    flayerPotrait,
    flayerLandscape,
    square,
    NewFlayerPotraitCanvasStyle,
  };
  