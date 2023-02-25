const { program, Option } = require("commander");
const { generate } = require("./src/sakura");
const { getMeetupConfig } = require("./src/config");
const { Style } = require("./src/styles/styles");

program
  .name("sakura")
  .description("Automate community poster creation")
  .version("0.1.0");

program
  .command("generate")
  .description("Generate image")
  .addOption(
    new Option("--canvas-type <type>", "canvas type")
      .choices(["flayer_potrait"])
      .default("flayer_potrait")
  )
  .addOption(
    new Option("--font-family <family>", "font family")
      .choices(["opensans"])
      .default("opensans")
  )
  .addOption(
    new Option("--colour-combination <combination>", "colour combination")
      .choices(["teal"])
      .default("teal")
  )
  .addOption(
    new Option("--meetup-config <file>", "meetup configuration file").default(
      "meetup.yaml"
    )
  )
  .addOption(
    new Option("--output-file <file>", "output file name").default("meetup.png")
  )
  .action((str, options) => {
    meetupConfig = getMeetupConfig(str.meetupConfig);
    console.log(meetupConfig)

    const styleConfig = new Style()
      .setCanvasType(str.canvasType)
      .setFontFamily(str.fontFamily)
      .setColourCombination(str.colourCombination)
      .setOrganizerNumber(meetupConfig.organizers.length)
      .setSpeakerNumber(meetupConfig.speakers.length)
      .setSponsorNumber(meetupConfig.sponsors.length)
      .validate()
      .build()

    generate(meetupConfig, styleConfig, str.outputFile);
  });

program.parse();
