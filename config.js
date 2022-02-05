const yaml = require('js-yaml');
const fs   = require('fs');

const getConfig = function () {
  var config = {}

  try {
    config = yaml.load(fs.readFileSync('meetup.yaml', 'utf8'));
    validateConfig(config)
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
  
  return config
}

const validateConfig = function(config) {
  if (!config.meetup.speakers) {
    throw "Please fill the speakers"
  }

  if (config.meetup.speakers.length > 4) {
    throw "Speakers more than 4 is not supported"
  }

  if (config.meetup.sponsors) {
    if (config.meetup.sponsors.length > 8) {
      throw "Sponsor more than 8 is not supported"
    }
  }
}

module.exports = { getConfig };
