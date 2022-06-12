class Player {
    id;
    opponent;

    constructor(id) {
        this.id = id;
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
}


module.exports = Player; 