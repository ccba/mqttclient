mqtt client base on mqttws for the websocket connection

## Features

- Equip with ES6 & Babel 6
- Build with gulp

## How to use

First, you should clone the repo and install the dependencies.

```bash
$ git clone https://github.com/ccba/mqttclient.git <foldername>
$ cd <foldername>
$ npm install
```

Then, build the source to the disk

```bash
$ gulp
```


finally, use the mqttclient like this

- subscribe a topic(订阅一个topic)

```bash
let mqtt = new MqttClient("127.0.0.1", "8080", '');
mqtt.connect(() => {
    mqtt.subscribe("topic", (message) => {
        console.log(message);
    });
});
```

- publish a message by a topic(发送消息到topic)
```bash
mqtt.publish("topic", "publish to a message");
```

## License

MIT
