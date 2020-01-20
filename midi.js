const easymidi = require('easymidi');
const { Midi } = require('@tonaljs/modules');

function listen() {
    const input = new easymidi.Input('Launchkey Mini 0');
    
    input.on('noteon', function (msg) {
        const note = Midi.midiToNoteName(msg.note)
        console.log(note);
    });
}

module.exports = listen;
// module.exports = listMidiDevices;