const { createCanvas } = require('canvas')
const fs = require('fs');
const { Meetup } = require('./builder');
const { getConfig } = require("./config");

const config = getConfig()
const width = 2480
const height = 3508

const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')

gradient = context.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0.0,"#dd166b");
gradient.addColorStop(1.0,"#412a62");
context.fillStyle = gradient;
context.fillRect(0, 0, width, height); 

const meetup = new Meetup(context)
    .setTitle(config.meetup.name)
    .setDescription(config.meetup.date, config.meetup.time, config.meetup.place)
    .setURL(config.meetup.registration_url)

if (config.meetup.sponsors) {
    if (config.meetup.sponsors.length > 0) {
        meetup.setSponsors(config.meetup.sponsors)
    }
}

meetup.build()

const buffer = canvas.toBuffer('image/png')
fs.writeFileSync('./test.png', buffer)
