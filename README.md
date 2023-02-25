# Sakura

A service that help community organizer create meetup poster.

### Getting Started
- populate all the information in the meetup.yaml and copy the required image for sponsors and speakers
- to generate the poster, run
```
$ node cli.js generate --meetup-config ./example/meetup.yaml --output-file ./example/meetup.png
```

You can see all available options with
```
$ node cli.js generate --help
Usage: sakura generate [options]

Generate image

Options:
  --canvas-type <type>                canvas type (choices: "flayer_potrait", default: "flayer_potrait")
  --font-family <family>              font family (choices: "opensans", default: "opensans")
  --colour-combination <combination>  colour combination (choices: "teal", default: "teal")
  --meetup-config <file>              meetup configuration file (default: "meetup.yaml")
  --output-file <file>                output file name (default: "meetup.png")
  -h, --help                          display help for command
```
