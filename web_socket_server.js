const Room = require("./models/room");
const WebSocketServer = require('ws');
const Player = require("./models/player");
 
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 });
let rooms = [];
let playersInLobby = [];
 
// Creating connection using websocket
wss.on("connection", (ws, socket) => {
    const userName = socket.headers.username;
    const player = new Player(userName, ws);
    playersInLobby.push(player);
    console.log(`${player.id} is connected!`);

    // sending message
    ws.on("message", data => {
        if (data == "create room") {
            const room = new Room(player.id);
            rooms.push(room);

            wss.clients.forEach((client) => {
                // we are going to update UI for that user only
                if (client == ws) {
                    if (client.readyState === WebSocketServer.OPEN) {
                        console.log("move user to waiting room...");
                        client.send(JSON.stringify({roomInfo: room}));
                    }
                }

                // for the others, 
                if (client.readyState === WebSocketServer.OPEN) {
                    console.log("sending to refresh lobby...");
                    client.send(JSON.stringify({roomList: rooms}));
                }
            })
        }

        if (data.includes("join")) {
            console.log("someone joined");
            const owner = data.toString().substring(data.indexOf(" ") + 1);
            const joinedRoom = rooms.find((room) => {
                return room.owner == owner;
            });
            if (joinedRoom == null) {} // return error

            console.log("im here");
            console.log(player.id);

            joinedRoom.join(player.id);

            let opponent = playersInLobby.find((player) => {
                return player.id == owner;
            });

            if (opponent == null) {}// return error

            ws.send(JSON.stringify({roomInfo: joinedRoom}));
            opponent.socket.send(JSON.stringify({roomInfo: joinedRoom}));
        }

        if (data == "refresh lobby") {
            // for the others, 
            if (ws.readyState === WebSocketServer.OPEN) {
                console.log("sending to refresh lobby...");
                ws.send(JSON.stringify({roomList: rooms}));
            }
        }

        if (data == "leave room") {
            const room = rooms.find((room) => {
                return room.hasPlayer(player.id);
            })
            room.remove(player.id);

            if (room.shouldDestroy()) {
                console.log("yes should destroy");
                rooms = rooms.filter((element) => {
                    return element != room;
                });
            }
            
            wss.clients.forEach((client) => {
                if (client == ws) {
                    if (client.readyState === WebSocketServer.OPEN) {
                        console.log(JSON.stringify({roomInfo: room}));
                        client.send(JSON.stringify({roomInfo: room}));
                    }
                }

                if (client.readyState === WebSocketServer.OPEN) {
                    console.log("sending to refresh lobby...");
                    client.send(JSON.stringify({roomList: rooms}));
                }
            })

        }
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");


const roomInfo = function(roomId, owner) {
    return {
        roomId, 
        owner 
    }
}