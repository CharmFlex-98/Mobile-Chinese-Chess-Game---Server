class Player {
    id;
    opponent;
    socket;

    constructor(id, socket) {
        this.id = id;
        this.socket = socket;
    }

    pair(opponent) {
        this.opponent = opponent;
    }

    unpair() {
        this.opponent = null;
    }

    isPaired() {
        return this.opponent != null;
    } 
    
    send(message) {
        this.socket.send(message);
    }
}


module.exports = Player; 