const canvasTxt = require('canvas-txt').default
const { loadImage } = require('canvas')
const { titleStyle, titleDescriptionStype, urlStype, sponsorStyle, sponsorImageStype, sponsorImagesStype } = require('./style')

class Meetup {
    constructor(context) {
        this.context = context;
        this.title = undefined;
        this.description = undefined;
        this.url = undefined;
        this.sponsors = undefined;
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

    async build() {
        this.buildDescription()

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
        drawText(this.context, "In Partnership with", sponsorStyle)
        
        var sponsorCount = 0

        for (var y = 0; y < sponsorImagesStype.verticalDivider; y++) {
            for (var x = 0; x < sponsorImagesStype.horizontalDivider; x++) {
                if (this.sponsors.length > sponsorCount) {
                    const dx = sponsorImagesStype.dx + (sponsorImageStype.width * x) + (sponsorImageStype.padding * x)
                    const dy = sponsorImagesStype.dy + (sponsorImageStype.height * y) + (sponsorImageStype.padding * y) 

                    await drawImage(
                        this.context,
                        this.sponsors[sponsorCount].image_path,
                        dx,
                        dy,
                        sponsorImageStype.width,
                        sponsorImageStype.height
                    )

                    sponsorCount++
                }
            }
        }
    }
}

const drawText = (ctx, text, style) => {
    ctx.fillStyle = style.fontColor
    canvasTxt.font = style.fontType
    canvasTxt.align = style.align
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

module.exports = { Meetup };
