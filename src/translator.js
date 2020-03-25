const { Midi } = require('@tonaljs/modules');

let bucket = [];

/**
 * Receives a MIDI note number and returns the note name
 * 
 * @param {String} midiNote 
 * @returns {String} noteName
 */
function getNote(midiNote) {
    const note = Midi.midiToNoteName(midiNote);
    bucket.push(note);

    return note;
}

module.exports = {
    getNote: getNote,
    bucket: bucket
};