// Musician application

// Get the udp4 sesrver
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

// Get the uuid version
const { v4: uuidv4 } = require('uuid');

// Import global variables
const protocol = require('./protocol.js');

const udpSocket = dgram.createSocket('udp4');

const instrument = process.argv[2];

udpSocket.bind(protocol.UDP_PORT);

function sendMusic() {
	console.log("Playing the " + instrument + " : " + protocol.INSTRUMENTS[instrument]);

	// Create the payload to send with :
	//  - the instruement
	//  - the correct sound
	//  - the uuid value
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

