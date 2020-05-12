export default class PianoKey extends HTMLLIElement {
    constructor(note) {
        super();
        this.note = note;
    }

    connectedCallback() {
        let keyColor = this.note.includes('S') ? 'black' : 'white';
        let key = this.note.toLowerCase();
        
        this.classList.add(keyColor);
        this.classList.add(key);
    }
}

window.customElements.define('piano-key', PianoKey, { extends: 'li' });