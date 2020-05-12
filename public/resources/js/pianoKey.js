export default class PianoKey extends HTMLLIElement {
    constructor(note, keyColor) {
        super();
        this.note = note;
        this.keyColor = keyColor;
    }

    getNote() {
        return this.note;
    }

    press() {
        if (this.keyColor == 'white') {
            this.classList.add('white-active');
        } else {
            this.classList.add('black-active');
        }
    }

    release() {
        this.classList.remove('white-active');
        //this.classList.remove('black-active');
    }

    connectedCallback() {
        this.classList.add(this.keyColor);
        this.classList.add(this.note);
    }
}

window.customElements.define('piano-key', PianoKey, { extends: 'li' });