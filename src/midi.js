const easymidi = require('easymidi');
const chords = require('./chords');
const { Midi } = require('@tonaljs/tonal');

const { EventEmitter } = require('events');
const em = new EventEmitter();

let selectedMidiController = '';
const pressedNotes = [];

function getSelectedMidiController() {
    return selectedMidiController;
}

function getPressedNotes() {
    return pressedNotes;
}

function getAllMidiControllers() {
    return easymidi.getInputs();
}

function _noteOn(midiNote) {
    const note = Midi.midiToNoteName(midiNote);
    pressedNotes.push(note);

    if(note == 'C5') {
        input.close();
        console.log('CLOSED');
    }

    return note;
}

function _noteOff(midiNote) {
    const releasedNote = Midi.midiToNoteName(midiNote);
    
    const indexToRemove = pressedNotes.findIndex(noteInArray => noteInArray == releasedNote);
    if (indexToRemove != -1) pressedNotes.splice(indexToRemove, 1);
    
    return releasedNote;
}

function _sendNoteOnEvent(notes, chord) {
    const message = {
        action: 'pressed'
    };
    
    if (notes) message.notes = notes;
    if (chord) message.chord = chord;

    em.emit('noteOn', message);
}

function _sendNoteOffEvent(notes) {
    const message = {
        action: 'released'
    };
    if (notes) message.notes = notes;

    em.emit('noteOff', message);
}

/**
 * Gets the first MIDI controller and listens to it
 * 
 * TODO: if no MIDI controllers were found emit an error event to the Sender API
 * 
 */
function init() {
    const inputs = getAllMidiControllers();

    if (inputs.length) {
        selectedMidiController = inputs[0];
        const input = new easymidi.Input(selectedMidiController);

        input.on('noteon',  (msg) => {
            const note = _noteOn(msg.note);
            const chord = chords.getChord(pressedNotes);
            
            _sendNoteOnEvent(pressedNotes, chord);
        });
        input.on('noteoff', (msg) => { 
            const note = _noteOff(msg.note);

            _sendNoteOffEvent(note);
        });
    } else {
        return 'No MIDI Controllers found.'
    }
}

module.exports = {
    init: init,
    getSelectedMidiController,
    getPressedNotes,
    getAllMidiControllers,
    em
}