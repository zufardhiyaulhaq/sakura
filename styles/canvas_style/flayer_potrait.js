const newTitleStyle = function (fontFamily, colourCombination) {
    return {
      fontType: fontFamily.family,
      fontColor: colourCombination.font,
      fontWeight: "bold",
      fontSize: 140,
      align: "left",
      vAlign: "middle",
      dx: 130,
      dWidth: 2170,
      dy: 600,
      dHeight: 200,
    };
  };
  
  const newTitleDescriptionStyle = function (fontFamily, colourCombination) {
    return {
      fontType: fontFamily.family,
      fontColor: colourCombination.font,
      fontWeight: "bold",
      fontSize: 70,
      align: "left",
      vAlign: "middle",
      dx: 130,
      dWidth: 2170,
      dy: 900,
      dHeight: 70,
    };
  };
  
  const newUrlStyle = function (fontFamily, colourCombination) {
    return {
      fontType: fontFamily.family,
      fontColor: colourCombination.font,
      fontWeight: "bold",
      fontSize: 70,
      align: "left",
      vAlign: "middle",
      dx: 130,
      dWidth: 2170,
      dy: 1000,
      dHeight: 70,
    };
  };
  
  const newSponsorStyle = function (fontFamily, colourCombination) {
    return {
      text: {
        fontType: fontFamily.family,
        fontColor: colourCombination.font,
        fontWeight: "bold",
        fontSize: 50,
        align: "left",
        vAlign: "middle",
        dx: 130,
        dWidth: 2170,
        dy: 100,
        dHeight: 50,
      },
      image: {
        width: 384,
        height: 256,
        padding: 30,
      }
    };
  };
  
  const newSponsorBox = function (sponsorStyle) {
    const horizontalDivider = 4
    const verticalDivider = 1
  
    return {
      dx: 130,
      dy: 200,
      horizontalDivider: horizontalDivider,
      verticalDivider: verticalDivider,
      dWidth:
      sponsorStyle.image.width * horizontalDivider +
        (horizontalDivider - 1) * sponsorStyle.image.padding,
      dHeight:
      sponsorStyle.image.height * verticalDivider +
        (verticalDivider - 1) * sponsorStyle.image.padding,
    };
  };
  
  const speakerBox = {
    dx: 130,
    dy: 1180,
    horizontalDivider: 1,
    verticalDivider: 4,
  };
  
  const newSpeakerStyle = function (multiplier, fontFamily, colourCombination) {
    return {
      image: {
        width: 128 * multiplier,
        height: 128 * multiplier,
      },
      name: {
        fontType: fontFamily.family,
        fontColor: colourCombination.font,
        fontWeight: "bold",
        fontSize: 70,
        align: "left",
        vAlign: "top",
        dWidth: 1500,
        dHeight: 70,
      },
      company: {
        fontType: fontFamily.family,
        fontColor: colourCombination.font,
        fontWeight: "regular",
        fontSize: 60,
        align: "left",
        vAlign: "top",
        dWidth: 1500,
        dHeight: 120,
      },
      title: {
        fontType: fontFamily.family,
        fontColor: colourCombination.font,
        fontWeight: "regular",
        fontSize: 60,
        align: "left",
        vAlign: "top",
        dWidth: 1500,
        dHeight: 180,
      },
      padding: 30,
    }
  }
  
  const newOrganizerStyle = function (fontFamily, colourCombination) {
    return {
      text: {
        fontType: fontFamily.family,
        fontColor: colourCombination.font,
        fontWeight: "bold",
        fontSize: 50,
        align: "left",
        vAlign: "middle",
        dx: 130,
        dWidth: 2170,
        dy: 3000,
        dHeight: 50,
      },
      image: {
        width: 384,
        height: 256,
        padding: 30,
      }
    }
  };
  
  const organizerBox = {
    dx: 130,
    dy: 3100,
    horizontalDivider: 4,
    verticalDivider: 1,
  };

  const NewFlayerPotraitCanvasStyle = function (speakerMultiplier, fontFamily, colourCombination) {
    const sponsorStyle = newSponsorStyle(fontFamily, colourCombination)
    const speakerStyle = {}


    return {
      titleStyle: newTitleStyle(fontFamily, colourCombination),
      titleDescriptionStyle: newTitleDescriptionStyle(fontFamily, colourCombination),
      urlStyle: newUrlStyle(fontFamily, colourCombination),
      sponsorStyle: sponsorStyle,
      sponsorBox: newSponsorBox(sponsorStyle),
      speakerStyle: newSpeakerStyle(speakerMultiplier,fontFamily, colourCombination),
      speakerBox: speakerBox,
      organizerStyle: newOrganizerStyle(fontFamily, colourCombination),
      organizerBox: organizerBox
    }
  }
  
  module.exports = {
    NewFlayerPotraitCanvasStyle
  };
  