import PianoWrapper from './pianoWrapper.js';

class AppMain extends HTMLElement {
    constructor() {
        super();
        this.lastPlayedNotes = '';
        this.lastReleasedNote = '';
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
             * event.data = { action: 'pressed', notes: [], chord: ''}
             */
            const message = JSON.parse(event.data);
            this.lastAction = message.action;
            
            if (message.action == 'pressed') {
                this.lastPlayedNotes = message.notes;
                this.lastPlayedChord = message.chord;

                this.dispatchEvent(this.onpress);
            } else {
                this.lastReleasedNote = message.notes;

                this.dispatchEvent(this.onrelease);
            }
        };

        const piano = new PianoWrapper(12, 'C2');
        this.shadowRoot.appendChild(piano);
 
        this.addEventListener('onpress', (event) => piano.playNotes(this.lastPlayedNotes));
        this.addEventListener('onrelease', (event) => piano.releaseNotes(this.lastReleasedNote));
    }
}

window.customElements.define('app-main', AppMain);