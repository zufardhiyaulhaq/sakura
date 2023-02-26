# Sakura

Sakura is a service for automating poster creation for community meetups! With this service, you can easily create beautiful and professional-looking posters for your events without the need for any design skills.

## Getting Started

Sakura supports both CLI-based (local) and server-based usage, making it flexible for different scenarios. If you prefer to use the service locally on your own computer, you can simply install the CLI version and start generating posters right away. On the other hand, if you need to generate posters for multiple events or collaborate with others, you can use the server-based version that can be accessed from anywhere with an internet connection.

You can see all available options with

```
$ ts-node src/sakura.ts --help
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

### Client-side

- get all of the dependencies

```
$ npm install
```

- populate all the information in the meetup.yaml and copy the required image for sponsors and speakers
- to generate the poster, run

```
$ ts-node src/sakura.ts generate --meetup-config ./example/meetup.yaml --output-file ./example/meetup.png
```

### Server-side

- get all of the dependencies

```
$ npm install
```

- populate all the required environment variable, please check .env.example
- run the server

```
$ ts-node src/sakura.ts server
```

- try to generate the poster

```
$ curl --location --request POST 'http://0.0.0.0:3000/v1/generate' \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "canvas_type": "flayer_potrait",
    "font_family": "opensans",
    "colour_combination": "teal",
    "meetup": {
        "name": "Kubernetes Cloud Native Online Meetup February 2022",
        "date": "24 February 2022",
        "time": "19:00 WIB",
        "place": "Youtube",
        "registration_url": "online.kubernetescommunity.id",
        "sponsors": [
            {
                "name": "Istio",
                "image_path": "https://istio.io/v1.12/img/istio-whitelogo-bluebackground-framed.svg"
            }
        ],
        "speakers": [
            {
                "name": "Dina Setyo",
                "position": "Cloud Platform Engineer",
                "company": "Gojek",
                "title": "Building Developer Experience 101",
                "image_path": "https://cdn.idntimes.com/content-images/post/20200317/5-c732fe8f39e5683aeb3a01b272e1851e.jpg"
            }
        ],
        "organizers": [
            {
                "name": "Cloud Native Indonesia",
                "image_path": "https://istio.io/v1.12/img/istio-whitelogo-bluebackground-framed.svg"
            }
        ]
    }
}'
```

- Open the swagger for more information

```
http://0.0.0.0:3000/api-docs
```

## Style

Sakura define a poster style into 3 categories:

1. Layout
2. Colour Combination
3. Font Family

You can combine the categories depends on your use cases. Please check this table for all of the available option for each category.

| Layout         | Colour Combination | Font Family |
| -------------- | ------------------ | ----------- |
| flayer_potrait | teal               | opensans    |
