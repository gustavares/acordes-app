const easymidi = require('easymidi');
const { Midi } = require('@tonaljs/modules');
const EventEmitter = require('events').EventEmitter;

class Bucket extends EventEmitter {
    // https://itnext.io/the-observer-pattern-in-nodejs-c0cfffb4744a
}

function listen() {
    const input = new easymidi.Input('Launchkey Mini 0');

    input.on('noteon', function (msg) {
        const note = Midi.midiToNoteName(msg.note)
        console.log('On: ', note);
    });

    input.on('noteoff', function(msg){
        const note = Midi.midiToNoteName(msg.note)
        console.log('Off: ',note);
    });
}

module.exports = listen;
// module.exports = listMidiDevices;