dunkelziffer
============

News crawler for the deep web

## Install

```sh
$ npm install
```

## Run local webserver
```sh
$ npm start
```


## Run TOR Docker Proxy

Pull and run the Docker image `nagev/tor` and bind port `9150` via the following command:

```sh
$ docker run -d -p 9150:9150 nagev/tor
```

