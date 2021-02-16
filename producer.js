const { Kafka } = require("kafkajs");
const msg = process.argv[2];

const run = async function () {
	try {
		await connect();
	} catch (error) {
		console.log(error);
	} finally {
		process.exit(0);
	}
};

const connect = async function () {
	const kafka = new Kafka({
		clientId: "myApp",
		brokers: ["192.168.15.27:9092"],
	});

	const producer = kafka.producer();

	await producer.connect();

	const partition = msg[0].toLowerCase() < "n" ? 0 : 1;

	const result = await producer.send({
		topic: "Users",
		messages: [{ value: msg, partition: partition }],
	});

	console.log(JSON.stringify(result));

	await producer.disconnect();
};

run();
