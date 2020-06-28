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

// UDP Socket //
// bind the datagram socket to listen
udpSocket.bind(protocol.UDP_PORT, function() {
  console.log("Listening to the orchestra");
  udpSocket.addMembership(protocol.UDP_ADDRESS);
});

// on receiving a message on the socket
udpSocket.on('message', function(msg, source) {
	console.log("Data has arrived: " + msg + ". Source port: " + source.port);
	var json = JSON.parse(msg);
});


// TCP Server //
tcpServer.listen(protocol.TCP_PORT);
tcpServer.on('connection', function(socket) {
	var json = [];
	
	json.push({
		uuid: "uuid",
		instrument: "instrument",
		activeSince: "activeSince"
	});
		
	socket.write(JSON.stringify(json));

    socket.end();
});