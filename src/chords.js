const { Chord } = require('@tonaljs/tonal');
//const { ChordType } = require("@tonaljs/tonal");

/**
 * Receives an array of notes and returns a chord name
 * @param {Array} notes 
 * @return {String} chordName
 */
function getChord(notes) {
    // TODO: sort the notes from lowest to highest
    
    const detectedChord = Chord.detect(notes);
    let formattedChord;
     
    if (typeof detectedChord === 'string' ) {
        formattedChord = detectedChord;
    } else {
        // it detected more than one chord

        // TODO: choose which chord to pick 
        formattedChord = detectedChord[0];
    }

    /**
     *  TODO: format chord output
     */

    return formattedChord;
}

/**
 * Receives a chord to select the correct alias
 * 
 * CMadd9 -> should be just C9
 * Cmaj7 -> C7M
 * @param {String} chord 
 */
function getChordAlias(chord) {
    switch (chord) {

    }
}

module.exports = {
    getChord
};