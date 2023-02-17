
const { program, Option } = require('commander');
const { generate } = require('./sakura');

program
  .name('sakura')
  .description('Automate community poster creation')
  .version('0.1.0');

const canvasType = new Option('--canvas-type <type>', 'canvas type').choices(['flayer_potrait', 'flayer_landscape', 'square']).default('flayer_potrait')
const fontFamily = new Option('--font-family <family>', 'font family').choices(['opensans']).default('opensans')
const colourCombination = new Option('--colour-combination <combination>', 'colour combination').choices(['teal']).default('teal')

program.command('generate')
  .description('Generate image')
  .addOption(canvasType)
  .addOption(fontFamily)
  .addOption(colourCombination)
  .action((str, options) => {
    console.log(str)
    generate()
  });

program.parse();
