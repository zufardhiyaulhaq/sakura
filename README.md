# Sakura

A service that help community organizer create meetup poster.

### Getting Started
- get all of the dependencies
```
$ npm install
```
- populate all the information in the meetup.yaml and copy the required image for sponsors and speakers
- to generate the poster, run
```
$ ts-node index.ts generate --meetup-config ./example/meetup.yaml --output-file ./example/meetup.png
```

You can see all available options with
```
$ ts-node index.ts --help
Usage: sakura [options] [command]

Automate community poster creation

Options:
  -V, --version       output the version number
  -h, --help          display help for command

Commands:
  generate [options]  Generate image
  server [options]    Run sakura server
  help [command]      display help for command
```
