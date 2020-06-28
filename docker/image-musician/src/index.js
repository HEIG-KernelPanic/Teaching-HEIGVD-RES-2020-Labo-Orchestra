// Musician application

const dgram = require('dgram');

const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

// Import global variables
const global = require('./global.js');

const server = dgram.createSocket('udp4');

const instrument = process.argv[2];

function sendMusic() {
	console.log("Playing the " + instrument + " : " + global.instruments[instrument]);

	const payload = JSON.stringify({
		"instrument" : instrument,
        "sound"      : global.instruments[instrument],
        "uuid"       : uuid
    });

    server.send(payload, 0, payload.length, global.port, global.multicastAddress, function() {
        console.log("Sent " + payload + "\n");
    });

}

if (! global.instruments[instrument]) {
    console.log('I don\'t know this instrument...' + instrument);
    process.exit(1);
} else {
	setInterval(sendMusic, global.interval);
}

server.bind(global.port);

