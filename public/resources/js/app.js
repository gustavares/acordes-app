import PianoWrapper from './pianoWrapper.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        piano-wrapper {
            position: absolute;
            bottom: 0;
        }

        piano-wrapper.col {
            display: grid;
            grid-template-columns: 100%;
        }
    </style>
`; 
class AppMain extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.lastPlayedNotes = '';
        this.lastReleasedNote = '';

        this.socket = new WebSocket('ws://localhost:1040');
        this.socket.onopen = (event) => this.socket.send('Hello server!');
    }

    connectedCallback() {
        this.onpress = new CustomEvent('onpress');
        this.onrelease = new CustomEvent('onrelease');

        this.socket.onmessage = (event) => {
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

        const piano = new PianoWrapper(49, 'C2');
        this.shadowRoot.appendChild(piano);
 
        this.addEventListener('onpress', (event) => piano.playNotes(this.lastPlayedNotes));
        this.addEventListener('onrelease', (event) => piano.releaseNote(this.lastReleasedNote));
    }
}

window.customElements.define('app-main', AppMain);