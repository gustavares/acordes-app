const chai = require('chai');
const should = chai.should();

const chords = require('../src/chords');

describe('chords', () => {
    describe("getChord(['C', 'E', 'G'])", () => {
        it('should return CM', () => {
            const pressedNotes = chords.getChord(['C', 'E', 'G']);
            pressedNotes.should.be.equal('CM');
        });
    });

    describe("getChord(['C', 'E', 'G', 'B' ])", () => {
        it('should return Cmaj7', () => {
            const pressedNotes = chords.getChord(['C', 'E', 'G', 'B']);
            pressedNotes.should.be.equal('Cmaj7');
        });
    });

    describe("getChord(['C', 'E', 'G', 'D' ])", () => {
        it('should return CMadd9', () => {
            const pressedNotes = chords.getChord(['C3', 'E3', 'G3', 'D3']);
            pressedNotes.should.be.equal('CMadd9');
        });
    });

    describe("getChord(['G3', 'C4', 'E4', 'G4'])", () => {
        it('should return CM/G', () => {
            const pressedNotes = chords.getChord(['G3', 'C4', 'E4', 'G4']);
            pressedNotes.should.be.equal('CM/G');
        });
    });
});