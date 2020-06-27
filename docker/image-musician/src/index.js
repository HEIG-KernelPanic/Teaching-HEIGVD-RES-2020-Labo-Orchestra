const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.setBroadcast(true);

function sendMusic() {
	console.log("Sending my music");
	server.send("Music", port=8080, address='255.255.255.255');
}

setInterval(sendMusic, 1000);
