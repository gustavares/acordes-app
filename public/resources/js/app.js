class AppMain extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = 'Acordes App';
        this.socket = new WebSocket('ws://localhost:1040');
        
        this.socket.onmessage = function(event) {
            var data = event.data
            console.log(data);
        }

        this.socket.onopen = (event) => {
            this.socket.send('Hello server!')  
        } 
    }
}

window.customElements.define('app-main', AppMain);