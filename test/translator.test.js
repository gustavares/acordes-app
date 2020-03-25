const chai = require('chai');
const should = chai.should();

const { getNote } = require('../src/translator');

describe('Translator', () => {
    describe('#getNote(60)', () => {
        it('should return C4', () => {
            const note = getNote(60);
            note.should.equal('C4');
        });
    });
});