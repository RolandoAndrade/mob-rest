# mob-rest  ![npm](https://img.shields.io/badge/nestjs.7.5.1-green) ![npm](https://img.shields.io/badge/vue.2.6.11-green) ![npm](https://img.shields.io/badge/socketio.2.3.0-blue)

Rest object manager created as distribute systems project.

## Requirements

You must install NodeJS, NestJS and vue-cli

See [NodeJS download Reference](https://nodejs.org/es/download/).


## Install all dependencies, compile and build all files

Inside the context that you want to run

```shell script
npm install
```

## Build the client

```shell script
npm run build
```

`public` folder will be created at backend root folder.

## Build and run replication/coordinator/app server

Modify the `config.json` file at the context root folder, writing the host, port and repository root.

```shell script
npm run build
```

```shell script
PORT=300X npm run start:prod
```

## Open your browser at localhost:3000

Then [Open your browser at http://localhost:3000](http://localhost:3000)



