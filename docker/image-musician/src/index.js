// Musician application

const dgram = require('dgram');

// Import global variables
const global = require('./global.js');

const server = dgram.createSocket('udp4');

const instrument = process.argv[2];

server.setBroadcast(true);

function sendMusic() {
	console.log("Playing the " + instrument + " : " + global.instruments[instrument]);

	const payload = JSON.stringify({
		"instrument" : instrument,
        "sound"      : global.instruments[instrument],
        "uuid"       : uuidv4
    });

    server.send(payload, payload.length, global.port, global.multicastAddress, function() {
        console.log("Sent " + payload);
    });

}

if (! global.interval.has(instrument)) {
    console.log('I don\'t know this instrument...');
    process.exit(1);
} else {
	setInterval(sendMusic, global.interval);
}

server.bind(global.port);

