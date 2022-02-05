const background = {
    startColor: "#ffffff",
    endColor: "#ffffff"
}
const titleStyle = {
    fontType: "OpenSans",
    fontColor: '#000000',
    fontWeight: "bold",
    fontSize: 140,
    align: 'left',
    dx: 130,
    dWidth: 2170,
    dy: 700,
    dHeight: 200,
}

const titleDescriptionStype = {
    fontType: "OpenSans",
    fontColor: '#000000',
    fontWeight: "Regular",
    fontSize: 80,
    align: 'left',
    dx: 130,
    dWidth: 2170,
    dy: 1000,
    dHeight: 80,
}

const urlStype = {
    fontType: "OpenSans",
    fontColor: '#000000',
    fontWeight: "Regular",
    fontSize: 80,
    align: 'left',
    dx: 130,
    dWidth: 2170,
    dy: 1100,
    dHeight: 80,
}

const sponsorStyle = {
    fontType: "OpenSans",
    fontColor: '#000000',
    fontWeight: "bold",
    fontSize: 50,
    align: 'left',
    dx: 130,
    dWidth: 2170,
    dy: 100,
    dHeight: 50,
}

const sponsorImageStype = {
    width: 270,
    height: 180,
    padding: 30
}

const sponsorImagesStype = {
    dx: 130,
    dy: 200,
    horizontalDivider: 4,
    verticalDivider: 2,
}

sponsorImagesStype.dWidth = (sponsorImageStype.width * sponsorImagesStype.horizontalDivider) + ((sponsorImagesStype.horizontalDivider - 1) * sponsorImageStype.padding)
sponsorImagesStype.dHeight = (sponsorImageStype.height * sponsorImagesStype.verticalDivider) + ((sponsorImagesStype.verticalDivider - 1) * sponsorImageStype.padding)

module.exports = { background, titleStyle, titleDescriptionStype, urlStype, sponsorStyle, sponsorImageStype, sponsorImagesStype };
