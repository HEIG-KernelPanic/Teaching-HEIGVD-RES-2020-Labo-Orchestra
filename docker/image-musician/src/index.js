const dgram = require('dgram');
const serv = dgram.createSocket('udp4');

serv.setBroadcast(true);

function sendMusic() {
	console.log("Sending my music");
	serv.send("Music", port=8080, address='255.255.255.255');
}

setInterval(sendMusic, 1000);
