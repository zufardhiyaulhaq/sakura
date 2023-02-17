const { registerFont, createCanvas } = require('canvas')
const fs = require('fs');
const { Meetup } = require('./builder');
const { getConfig } = require("./config");
const { background } = require('./style')

const generate = () => {
    registerFont('./assets/fonts/OpenSans-Regular.ttf', { family: 'OpenSans', weight: "regular"})
    registerFont('./assets/fonts/OpenSans-Bold.ttf', { family: 'OpenSans', weight: "bold"})
    
    const config = getConfig()
    const width = 2480
    const height = 3508
    
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')
    
    gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0.0, background.startColor);
    gradient.addColorStop(1.0,background.endColor);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height); 
    
    const meetup = new Meetup(context)
        .setTitle(config.meetup.name)
        .setDescription(config.meetup.date, config.meetup.time, config.meetup.place)
        .setURL(config.meetup.registration_url)
        .setSpeakers(config.meetup.speakers)
        .setOrganizers(config.meetup.organizers)
    
    if (config.meetup.sponsors) {
        if (config.meetup.sponsors.length > 0) {
            meetup.setSponsors(config.meetup.sponsors)
        }
    }
    
    const build = async function() {
        await meetup.build()
        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./test.png', buffer)
    }
    
    build()
}

module.exports = {
    generate
};

