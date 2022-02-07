const canvasTxt = require('canvas-txt').default
const {
    loadImage
} = require('canvas')
const {
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
} = require('./style')

class Meetup {
    constructor(context) {
        this.context = context;
        this.title = undefined;
        this.description = undefined;
        this.url = undefined;
        this.sponsors = undefined;
        this.speakers = undefined;
        this.organizers = undefined;
    }

    setTitle(title) {
        this.title = title
        return this
    }

    setDescription(date, time, location) {
        this.description = date + " | " + time + " | " + location
        return this
    }

    setURL(url) {
        this.url = url
        return this
    }

    setSponsors(sponsors) {
        this.sponsors = sponsors
        return this
    }

    setSpeakers(speakers) {
        this.speakers = speakers
        return this
    }

    setOrganizers(organizers) {
        this.organizers = organizers
        return this
    }

    async build() {
        this.buildDescription()
        await this.buildSpeakers()
        await this.buildOrganizers()

        if (this.sponsors) {
            await this.buildSponsors()
        }
    }

    buildDescription() {
        drawText(this.context, this.title, titleStyle)
        drawText(this.context, this.description, titleDescriptionStype)
        drawText(this.context, this.url, urlStype)
    }

    async buildSponsors() {
        drawText(this.context, "In Partnership With", sponsorStyle)

        var sponsorCount = 0
        for (var y = 0; y < sponsorBox.verticalDivider; y++) {
            for (var x = 0; x < sponsorBox.horizontalDivider; x++) {
                if (this.sponsors.length > sponsorCount) {
                    const dx = sponsorBox.dx + (sponsorImageStyle.width * x) + (sponsorImageStyle.padding * x)
                    const dy = sponsorBox.dy + (sponsorImageStyle.height * y) + (sponsorImageStyle.padding * y)

                    await drawImage(
                        this.context,
                        this.sponsors[sponsorCount].image_path,
                        dx,
                        dy,
                        sponsorImageStyle.width,
                        sponsorImageStyle.height
                    )

                    sponsorCount++
                }
            }
        }
    }

    async buildOrganizers() {
        drawText(this.context, "Organized By", organizerStyle)

        var organizerCount = 0
        for (var y = 0; y < organizerBox.verticalDivider; y++) {
            for (var x = 0; x < organizerBox.horizontalDivider; x++) {
                if (this.organizers.length > organizerCount) {
                    const dx = organizerBox.dx + (organizerImageStyle.width * x) + (organizerImageStyle.padding * x)
                    const dy = organizerBox.dy + (organizerImageStyle.height * y) + (organizerImageStyle.padding * y)

                    await drawImage(
                        this.context,
                        this.organizers[organizerCount].image_path,
                        dx,
                        dy,
                        organizerImageStyle.width,
                        organizerImageStyle.height
                    )

                    organizerCount++
                }
            }
        }
    }

    async buildSpeakers() {
        var speakerCount = 0
        for (var y = 0; y < speakerBox.verticalDivider; y++) {
            for (var x = 0; x < speakerBox.horizontalDivider; x++) {
                if (this.speakers.length > speakerCount) {
                    const dxImage = speakerBox.dx + (speakerStyle.image.width * x) + (speakerStyle.padding * x)
                    const dyImage = speakerBox.dy + (speakerStyle.image.height * y) + 2 * (speakerStyle.padding * y)
                    await drawImage(
                        this.context,
                        this.speakers[speakerCount].image_path,
                        dxImage,
                        dyImage,
                        speakerStyle.image.width,
                        speakerStyle.image.height
                    )

                    const nameStyle = speakerStyle.name
                    nameStyle.dx = dxImage + speakerStyle.image.width + (3 * speakerStyle.padding)
                    nameStyle.dy = dyImage + speakerStyle.padding
                    drawText(this.context, this.speakers[speakerCount].name, nameStyle)

                    const companyStyle = speakerStyle.company
                    companyStyle.dx = dxImage + speakerStyle.image.width + (3 * speakerStyle.padding)
                    companyStyle.dy = nameStyle.dy + nameStyle.dHeight + speakerStyle.padding
                    drawText(this.context, `${this.speakers[speakerCount].position} @ ${this.speakers[speakerCount].company}`, companyStyle)

                    const titleStyle = speakerStyle.title
                    titleStyle.dx = dxImage + speakerStyle.image.width + (3 * speakerStyle.padding)
                    titleStyle.dy = companyStyle.dy + companyStyle.dHeight + speakerStyle.padding
                    drawText(this.context, this.speakers[speakerCount].title, titleStyle)

                    speakerCount++
                }
            }
        }
    }
}

const drawText = (ctx, text, style) => {
    ctx.fillStyle = style.fontColor
    canvasTxt.font = style.fontType
    canvasTxt.align = style.align
    canvasTxt.vAlign = style.vAlign
    canvasTxt.fontSize = style.fontSize
    canvasTxt.fontWeight = style.fontWeight
    canvasTxt.lineHeight = style.fontSize + (style.fontSize * 0.1)
    canvasTxt.drawText(
        ctx,
        text,
        style.dx,
        style.dy,
        style.dWidth,
        style.dHeight
    )
}

const drawImage = async (ctx, image_path, dx, dy, width, height) => {
    const image = await loadImage(image_path)
    var scale = Math.min(width / image.width, height / image.height);
    ctx.drawImage(image, dx, dy, image.width * scale, image.height * scale)

    return {
        widthSubtrator: width - (image.width * scale),
    }
}

module.exports = {
    Meetup
};
