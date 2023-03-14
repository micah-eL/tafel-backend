require('dotenv').config() //used for sensitive info

const express = require('express')
var app = express()
const cors = require('cors')
app.use(cors())

const PORT = process.env.PORT
var server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const io = require('socket.io')(server, {
    cors: {
        origin: "https://master.d1cwd691lheo6s.amplifyapp.com/",
        methods: ["GET"],
        headers: {
            'Access-Control-Allow-Origin' : '*'
        }
    }
})

io.on('connection', (socket) => {
    console.log("A user connected on socket: " + socket.id + ".\nAdditional socket handshake info:\n" + socket.handshake);

    socket.on('canvas-data', (data) => {
        console.log("Data received server side from " + socket.id);
        socket.broadcast.emit('canvas-data', data)
        console.log("Data from " + socket.id + " sent to all clients");
    })
})


