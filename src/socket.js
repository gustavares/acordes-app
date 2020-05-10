/**
 * Interface between MIDI listening/translation and the front-end
 * 
 * Listens to events fired in the midi.js and sends it to the front-end through web sockets
 * 
 */
const WebSocket = require("ws");
const wss = new WebSocket.Server( { port: 1040 } );
const { em } = require('./midi');

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    em.on('noteOn', (notes) => ws.send(JSON.stringify(notes)));
});