class Room {
    static index = 0;
    roomId;
    owner;
    redPlayers = [];
    blackPlayers = [];

    constructor(owner) {
        this.owner = owner;
        this.roomId = Room.generateRoomId();
        this.join(owner);

        console.log("room created by ", this.owner);
    }

    join(player) {
        if (this.canJoin) {
            if (this.redPlayers.length == 0) {
                this.insertRedPlayer(player);
            } else if (this.blackPlayers.length == 0) {
                this.insertBlackPlayer(player);
            }


            // if already full after joining
            if (this.playerInRoom == 2) {
                this.redPlayers[0].opponent = this.blackPlayers[0];
                this.blackPlayer[0].opponent = this.redPlayers[0];
            }
        }

        // not able to join
        
    }

    remove(player) {
        if (this.redPlayers.includes(player)) {
            this.redPlayers = this.redPlayers.filter((element) => {
                return element != player;
            });
        } else if (this.blackPlayers.includes(player)) {
            this.blackPlayers = this.blackPlayers.filter((element) => {
                return element != player;
            });
        }
    }

    canJoin() {
        return this.redPlayers.length + this.blackPlayers.length < 2;
    }

    shouldDestroy() {
        return this.playerInRoom() == 0;
    }

    playerInRoom() {
        return this.redPlayers.length + this.blackPlayers.length;
    }

    hasPlayer(player) {
        return (this.redPlayers.includes(player)) || (this.blackPlayers.includes(player));
    }

    insertRedPlayer(player) {
        this.redPlayers.push(player);
    }

    removeRedPlayer(player) {
        this.redPlayer = this.redPlayers.filter((player) => {
            return player != player;
        });
    }

    insertBlackPlayer(player) {
        this.blackPlayers.push(player);
    }

    removeBlackPlayer(player) {
        this.blackPlayer = this.blackPlayer.filter((player) => {
            return player != player;
        });
    }
    

    static generateRoomId() {
        return Room.index++;
    }

}


module.exports = Room;