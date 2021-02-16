const { Kafka } = require("kafkajs");

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

	const admin = kafka.admin();

	await admin.connect();

	console.log("Connected");

	await admin.createTopics({
		topics: [
			{
				topic: "Users",
				numPartitions: 2,
			},
		],
	});

	await admin.disconnect();

	console.log("Finished");
};

run();
