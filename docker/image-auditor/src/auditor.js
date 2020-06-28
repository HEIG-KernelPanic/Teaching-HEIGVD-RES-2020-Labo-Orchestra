// Import protocol
const protocol = require('./protocol.js');

// Standard Node module to work with UDP
const dgram = require('dgram');
var net = require('net');
var moment = require('moment');

// datagram socket
var udpSocket = dgram.createSocket('udp4');
var tcpServer = net.createServer()

var orchestra = new Map();

setInterval(musicianTimeout, protocol.PLAY_INTERVAL);

// UDP Socket //
// bind the datagram socket to listen
udpSocket.bind(protocol.UDP_PORT, function() {
  console.log("Listening to the orchestra");
  udpSocket.addMembership(protocol.UDP_ADDRESS);
});

// on receiving a message on the socket
udpSocket.on('message', function(msg, source) {
	//console.log("Data has arrived: " + msg + ". Source port: " + source.port);
	var json = JSON.parse(msg);
	
	if (orchestra.has(json.uuid)) {
		// Just heard the musician again
		orchestra.get(json.uuid).lastHeard = moment().format();
		console.log("Heard musician again : " + json.instrument + " uuid : " + json.uuid);
	} else {
		// Never heard the musician
		orchestra.set(json.uuid, {
			"instrument" : json.instrument,
			"activeSince" : moment().format(),
			"lastHeard" : moment().format()
		});
		console.log("Heard a new musician : " + json.instrument + " uuid : " + json.uuid);
	}
});

function musicianTimeout() {
	orchestra.forEach(function(value, key) {
		if (moment().diff(moment(value.lastHeard)) >= protocol.MUSICIAN_TIMEOUT) {
			console.log("Musician left : " + value.instrument + " uuid : " + key);
			orchestra.delete(key);
		}
	});
}

// TCP Server //
// listen on tcp port
tcpServer.listen(protocol.TCP_PORT);
tcpServer.on('connection', function(socket) {
	var json = [];
	
	orchestra.forEach(function(value, key) {
		json.push({
			uuid: key,
			instrument: value.instrument,
			activeSince: value.activeSince
		});
	});
	
		
	socket.write(JSON.stringify(json, null, 4));

    socket.end();
});