import PianoWrapper from './pianoWrapper.js';

class AppMain extends HTMLElement {
    constructor() {
        super();
        this.lastPlayedNotes = '';
        this.lastReleasedNotes = '';
        this.attachShadow({ mode: 'open'});

        this.socket = new WebSocket('ws://localhost:1040');
        this.socket.onopen = (event) => this.socket.send('Hello server!');
    }

    connectedCallback() {
        this.onpress = new CustomEvent('onpress');
        this.onrelease = new CustomEvent('onrelease');

        this.socket.onmessage = (event) => {
            // TODO; check if it is a pressed or released event
            /**
             * event.data = { type: 'pressed', notes: [], chord: ''}
             */
            this.lastPlayedNotes = event.data;
            this.dispatchEvent(this.onpress);
        };

        const piano = new PianoWrapper(12, 'C2');
        this.shadowRoot.appendChild(piano);
 
        this.addEventListener('onpress', (event) => piano.playNotes(this.lastPlayedNotes));
        this.addEventListener('onrelease', (event) => piano.releaseNotes(this.lastReleasedNotes));
    }
}

window.customElements.define('app-main', AppMain);