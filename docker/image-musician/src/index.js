// Musician application

// Get the udp4 sesrver
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

// Get the uuid version
const { v4: uuidv4 } = require('uuid');

// Import global variables
const global = require('./global.js');

// Get the instrument from the given arguments
const instrument = process.argv[2];

// Send the correct sound depending on the instrument
function sendMusic() {
	// Log the fact that we are playing the instrument
	console.log("Playing the " + instrument + " : " + global.instruments[instrument]);

	// Create the payload to send with :
	//  - the instruement
	//  - the correct sound
	//  - the uuid value
	const payload = JSON.stringify({
		"instrument" : instrument,
        "sound"      : global.instruments[instrument],
        "uuid"       : uuidv4()
    });

	// Send the payload on the multicast address and log the sent payload
    server.send(payload, 0, payload.length, global.port, global.multicastAddress, function() {
        console.log("Sent " + payload + "\n");
    });

}

// If the given instrument does not exist, stop the process
if (!global.instruments[instrument]) {
    console.log('I don\'t know this instrument...' + instrument);
    process.exit(1);
} 
// Otherwise send the music every second
else {
	setInterval(sendMusic, global.interval);
}

// Bind the server to given port
server.bind(global.port);

