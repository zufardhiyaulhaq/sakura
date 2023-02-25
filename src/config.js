const yaml = require("js-yaml");
const {readFileSync} = require("fs");

const getMeetupConfig = function (configPath = "meetup.yaml") {
  var config = {};

  try {
    config = yaml.load(readFileSync(configPath, "utf8"));
    validateMeetupConfig(config);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }

  return config;
};

const validateMeetupConfig = function (config) {
  if (!config.speakers) {
    throw "Please fill the speakers";
  }

  if (config.speakers.length === 0) {
    throw "Please fill the speakers";
  }
};

module.exports = {
  getMeetupConfig,
};
