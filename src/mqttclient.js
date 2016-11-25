let mqtt = new MqttClient("127.0.0.1", "8080", '');
mqtt.connect(() => {
	mqtt.subscribe("topic", (message) => {
		console.log(message);
	});
});

mqtt.publish("topic", "publish to a message");

class MqttClient {
	//'183.129.191.60', 9000
	constructor(host, port, path, clientId) {
		this.client = new Paho.MQTT.Client(host, port, path, "ClientIderer");
		this.client.onConnect = this.onConnect;
		this.client.onMessageArrived = this.onMessageArrived();
		this.client.onConnectionLost = this.onConnectionLost;
		this.connected = false;
		this.option = {
			host: host,
			port: port,
			path: path,
			clientId: clientId
		}
		this.tryCount = 0;
		this.forceClosed = false;
	}

	connect(successCallback) {
		this.client.connect({
			onSuccess: (arg) => {
				this.connected = true;
				this.forceClosed = false;
				successCallback(arg);
			},
			onFailure: (arg) => {
				console.log(`连接到$(this.option.host}:${this.option.port}失败`);
			},
			userName: "userName",
			password: "password",
		});
	}

	subscribe(topic, receiveMessageCallback) {
		this.client.subscribe(topic);
		this.topic = topic;
		this.receiveMessageCallback = receiveMessageCallback;
	}

	publish(topic, message) {
		this.client.send(topic, message);
	}

	disconnect() {
		this.connected = false;
		this.forceClosed = true;
		this.client.disconnect();
		console.log('web socket 关闭');
	}

	onConnectionLost(responseObject) {
		let that = this;
		return (responseObject) => {
			that.connected = false;
			if (responseObject.errorCode !== 0) {
				console.log(responseObject.errorCode + "\n" + responseObject.errorMessage);
				if (that.tryCount < 6) {
					that.tryCount++;
					that.connect(() => {
						setTimeout(() => {
							that.tryCount = 0;
						}, 60000);
						that.subscribe(that.topic);
					}, () => {});
				}
			}
		}

	}

	onMessageArrived() {
		let that = this;
		return (message) => {
			try {
				if (message && message.payloadString) {
					console.log(message.payloadString);
					let parse;
					if (window.JSON)
						parse = window.JSON.parse;
					else
						parse = $.parseJSON;
					let data = parse(message.payloadString);
					that.receiveMessageCallback(data);
				}
			} catch (e) {
				console.log(e);
			}
		}
	}

}
