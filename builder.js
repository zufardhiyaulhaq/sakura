const canvasTxt = require('canvas-txt').default
const { font, titleStyle, titleDescriptionStype, urlStype, sponsorStyle } = require('./style')

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

    build() {
        this.buildDescription()

        if (this.sponsors) {
            this.buildSponsors()
        }
    }

    buildDescription() {
        drawText(this.context, this.title, titleStyle)
        drawText(this.context, this.description, titleDescriptionStype)
        drawText(this.context, this.url, urlStype)
    }

    buildSponsors() {
        drawText(this.context, "In Partnership with", sponsorStyle)
    }
}

const drawText = (ctx, text, style) => {
    ctx.fillStyle = style.fontColor
        canvasTxt.font = font
        canvasTxt.align = style.align
        canvasTxt.fontSize = style.fontSize
        canvasTxt.fontWeight = style.fontWeight
        canvasTxt.lineHeight = style.fontSize + (style.fontSize * 0.1)
        canvasTxt.drawText(
            ctx,
            text,
            style.marginLeft,
            style.marginTop,
            style.marginRight - style.marginLeft,
            style.marginBottom - style.marginTop
        )
}

module.exports = { Meetup };
