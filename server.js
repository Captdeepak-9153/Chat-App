const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

// Middleware
app.use(express.static(path.join(__dirname, "public"))); // Serving static files from the 'public' directory

io.on("connection", function(socket){
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " joined the conversation");
    });

    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " left the conversation");
    });

    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    });
});

// Start the server
server.listen(3000, () => {
    console.log(`Server is hosted at http://localhost:3000`);
});
