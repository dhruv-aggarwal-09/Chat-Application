const WebSocket = require('ws'); // Import the WebSocket module

const PORT = 5501; // Define the port number

// Create a new WebSocket server instance
const server = new WebSocket.Server({ port: PORT });

// Store connected clients
const clients = new Set();

server.on('connection', (client) => {
    console.log("Client connected!");
    clients.add(client);

    // When the server receives a message from a client
    client.on('message', (message) => {
        console.log("Message received:", message.toString());

        // Broadcast the message to all connected clients
        clients.forEach((c) => {
            if (c.readyState === WebSocket.OPEN) { // Ensure the client is connected
                c.send(message);
            }
        });
    });

    // When the client disconnects
    client.on('close', () => {
        console.log("Client disconnected!");
        clients.delete(client);
    });
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);
