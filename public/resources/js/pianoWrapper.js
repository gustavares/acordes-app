import PianoKey from './pianoKey.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
    * {
        box-sizing:border-box
      }
      
      body {
        margin:0;
        background:#222
      }

      ul {
        height:16.5em;
        width:93em;
        margin:0 5em;
        padding:3em 0 0 4.25em;
        /*position:relative;*/
        border:1px solid #555;
        border-radius:1em;
        background-color: #000000;
        background-image: url("./public/resources/img/dark-wood.png");
        box-shadow:0 0 50px rgba(0,0,0,0.5) inset,0 1px rgba(212,152,125,0.2) inset,0 5px 15px rgba(0,0,0,0.5)
      }
      
      li {
        margin:0;
        padding:0;
        list-style:none;
        position:relative;
        float:left
      }
      
      ul .white {
        height:10em;
        width:2em;
        z-index:1;
        border-left:1px solid #bbb;
        border-bottom:1px solid #bbb;
        border-radius:0 0 5px 5px;
        box-shadow:-1px 0 0 rgba(255,255,255,0.8) inset,0 0 5px #ccc inset,0 0 3px rgba(0,0,0,0.2);
        background:linear-gradient(to bottom,#eee 0%,#fff 100%)
      }
      
      ul .white-active {
        border-top:1px solid #777;
        border-left:1px solid #999;
        border-bottom:1px solid #999;
        box-shadow:2px 0 3px rgba(0,0,0,0.1) inset,-5px 5px 20px rgba(0,0,0,0.2) inset,0 0 3px rgba(0,0,0,0.2);
        background:linear-gradient(to bottom,#fff 0%,#e9e9e9 100%)
      }
      
      .black {
        height:6em;
        width:1em;
        margin:0 -0.5em 0 -0.5em;
        z-index:2;
        border:1px solid #000;
        border-radius:0 0 3px 3px;
        box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -5px 2px 3px rgba(0,0,0,0.6) inset,0 2px 4px rgba(0,0,0,0.5);
        background:linear-gradient(45deg,#222 0%,#555 100%)
      }
      
      ul .black-active {
        box-shadow:-1px -1px 2px rgba(255,255,255,0.2) inset,0 -2px 2px 3px rgba(0,0,0,0.6) inset,0 1px 2px rgba(0,0,0,0.5);
        background:linear-gradient(to right,#444 0%,#222 100%)
      }
      
      .A,.G,.F,.D,.C,.B,.E {
        margin:0 0 0 -1em
      }
      
      ul li:first-child {
        border-radius:5px 0 5px 5px
      }
      
      ul li:last-child {
        border-radius:0 5px 5px 5px
      }
    </style>
    <ul></ul>
`;

export default class PianoWrapper extends HTMLElement {
    constructor(numOfKeys, startingNote) {
        // piano template : https://codepen.io/zastrow/pen/oDBki
        super();

        this.numOfOctaves = 6;
        this.numOfKeys = numOfKeys;
        this.startingNote = startingNote;
        this.keys = [];
        this.pressedNotes = [];
        this.notes = ["C", "D", "E", "F", "G", "A", "B"];

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.$wrapper = this.shadowRoot.querySelector('ul');
    }

    playNotes(notes) {
        notes.forEach(note => { 
            //note = note.slice(0, -1);
            let key = this.keys.find(key => key.getNote() == note);

            if (key != undefined) {
                key.press();
            }
        })
    }

    releaseNote(note) {
        //note = note.slice(0, -1);
        let key = this.keys.find(key => key.getNote() == note);

        if (key != undefined) {
            key.release();
        }
    }

    connectedCallback() {
      this.classList.add('col');


      // TODO: Refactor into separate functions
      for (let i = 1; i <= this.numOfOctaves; i++) {
        for (let j = 0; j < this.notes.length; j++) {
          let whiteKey;

          if (this.notes[j] != 'F' && this.notes[j] != 'C') {
            let blackKey = new PianoKey(`${this.notes[j]}b${i}`, 'black');
            this.keys.push(blackKey);
            this.$wrapper.appendChild(blackKey);
          }

          whiteKey = new PianoKey(`${this.notes[j]}${i}`, 'white');
          this.keys.push(whiteKey);
          this.$wrapper.appendChild(whiteKey);
        }
      }
    }

    getPressedNotes() {
        return this.pressedNotes;
    }
}


window.customElements.define('piano-wrapper', PianoWrapper);