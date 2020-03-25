const easymidi = require('easymidi');
const translator = require('./translator');

let selectedMidiController;

/**
 * This function is called in the main.js
 * 
 * it starts the entire process:
 * 1. gets the midi controllers
 * 2. selects the first one
 * 3. listens to "noteOn" and "noteOff" events
 *    3.1 emmits an event to the sockets 
 */


/**
 * Gets the first MIDI controller and listens to it
 * 
 * TODO: if no MIDI controllers were found emit an error event to the Sender API
 * 
 */
function init() {
    const inputs = getAllMidiControllers();

    if (inputs.length) {
        const input = new easymidi.Input(inputs[0]);
        _inputListener(input);
    } else {
        return 'No MIDI Controllers found.'
    }
}

function getSelectedMidiController() {
    return selectedMidiController;
}

function getAllMidiControllers() {
    return easymidi.getInputs();
}

function _inputListener(input) {
    input.on('noteon', function (msg) {
        const note = translator.getNote(msg.note);
        console.log(note);
        // fires an event to send the musical note to the front-end?
    });
}

module.exports = {
    init: init,
    selectedMidiController: getSelectedMidiController,
    allMidiControllers: getAllMidiControllers
};