const easymidi = require('easymidi');

function listen() {
    const input = new easymidi.Input('Launchkey Mini 0');
    
    input.on('noteon', function (msg) {
        console.log(msg);
    });
}

module.exports = listen;
// module.exports = listMidiDevices;