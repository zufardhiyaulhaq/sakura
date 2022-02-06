const background = {
    startColor: "#e8f0fb",
    endColor: "#b2cbea"
}
const titleStyle = {
    fontType: "OpenSans",
    fontColor: '#416ea3',
    fontWeight: "bold",
    fontSize: 140,
    align: 'left',
    vAlign: 'middle',
    dx: 130,
    dWidth: 2170,
    dy: 700,
    dHeight: 200,
}

const titleDescriptionStype = {
    fontType: "OpenSans",
    fontColor: '#416ea3',
    fontWeight: "bold",
    fontSize: 70,
    align: 'left',
    vAlign: 'middle',
    dx: 130,
    dWidth: 2170,
    dy: 1000,
    dHeight: 70,
}

const urlStype = {
    fontType: "OpenSans",
    fontColor: '#416ea3',
    fontWeight: "bold",
    fontSize: 70,
    align: 'left',
    vAlign: 'middle',
    dx: 130,
    dWidth: 2170,
    dy: 1100,
    dHeight: 70,
}

const sponsorStyle = {
    fontType: "OpenSans",
    fontColor: '#416ea3',
    fontWeight: "bold",
    fontSize: 50,
    align: 'left',
    vAlign: 'middle',
    dx: 130,
    dWidth: 2170,
    dy: 100,
    dHeight: 50,
}

const sponsorImageStyle = {
    width: 384,
    height: 256,
    padding: 30
}

const sponsorBox = {
    dx: 130,
    dy: 200,
    horizontalDivider: 4,
    verticalDivider: 1,
}

const speakerBox = {
    dx: 130,
    dy: 1280,
    horizontalDivider: 1,
    verticalDivider: 4,
}

const speakerImageStyle = {
    width: 384,
    height: 384,
}

const speakerNameStyle = {
    fontType: "OpenSans",
    fontColor: '#416ea3',
    fontWeight: "bold",
    fontSize: 70,
    align: 'left',
    vAlign: 'top',
    dWidth: 1500,
    dHeight: 70,
}

const speakerCompanyStyle = {
    fontType: "OpenSans",
    fontColor: '#416ea3',
    fontWeight: "regular",
    fontSize: 60,
    align: 'left',
    vAlign: 'top',
    dWidth: 1500,
    dHeight: 120,
}

const speakerTitleStyle = {
    fontType: "OpenSans",
    fontColor: '#416ea3',
    fontWeight: "regular",
    fontSize: 60,
    align: 'left',
    vAlign: 'top',
    dWidth: 1500,
    dHeight: 180,
}

const speakerStyle = {
    image: speakerImageStyle,
    name: speakerNameStyle,
    company: speakerCompanyStyle,
    title: speakerTitleStyle,
    padding: 30
}

const organizerStyle = {
    fontType: "OpenSans",
    fontColor: '#416ea3',
    fontWeight: "bold",
    fontSize: 50,
    align: 'left',
    vAlign: 'middle',
    dx: 130,
    dWidth: 2170,
    dy: 3100,
    dHeight: 50,
}

const organizerImageStyle = {
    width: 384,
    height: 256,
    padding: 30
}

const organizerBox = {
    dx: 130,
    dy: 3200,
    horizontalDivider: 4,
    verticalDivider: 1,
}


sponsorBox.dWidth = (sponsorImageStyle.width * sponsorBox.horizontalDivider) + ((sponsorBox.horizontalDivider - 1) * sponsorImageStyle.padding)
sponsorBox.dHeight = (sponsorImageStyle.height * sponsorBox.verticalDivider) + ((sponsorBox.verticalDivider - 1) * sponsorImageStyle.padding)

module.exports = {
    background,
    titleStyle,
    titleDescriptionStype,
    urlStype,
    sponsorStyle,
    sponsorImageStyle,
    sponsorBox,
    speakerStyle,
    speakerBox,
    organizerStyle,
    organizerImageStyle,
    organizerBox
};
