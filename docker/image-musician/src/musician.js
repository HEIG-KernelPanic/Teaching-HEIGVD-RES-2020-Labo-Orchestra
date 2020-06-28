// Musician application

const dgram = require('dgram');

const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

// Import global variables
const protocol = require('./protocol.js');

const udpSocket = dgram.createSocket('udp4');

const instrument = process.argv[2];

udpSocket.bind(protocol.UDP_PORT);

function sendMusic() {
	console.log("Playing the " + instrument + " : " + protocol.INSTRUMENTS[instrument]);

	const payload = JSON.stringify({
		"instrument" : instrument,
        "sound"      : protocol.INSTRUMENTS[instrument],
        "uuid"       : uuid
    });

    udpSocket.send(payload, 0, payload.length, protocol.UDP_PORT, protocol.UDP_ADDRESS, function() {
        console.log("Sent " + payload + "\n");
    });

}

if (! protocol.INSTRUMENTS[instrument]) {
    console.log('I don\'t know this instrument...' + instrument);
    process.exit(1);
} else {
	setInterval(sendMusic, protocol.PLAY_INTERVAL);
}

