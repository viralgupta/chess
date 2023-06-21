const express = require('express')
const dotenv = require('dotenv')
var cors = require('cors')
const connectDB = require('./config/db.js')
const { notFound, errorHandler } = require('./middlewear/errorhandler.js')
const path = require('path')
const userRoutes = require('./controller/userRoutes.js')
const chessRoute = require('./controller/chessRoutes.js')
const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
connectDB()


app.use('/api', userRoutes)
app.use('/api', chessRoute)



// -----------------------Deployment--------------------


// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname1, "/frontend/build")))
//     app.get("*", (req, res) => {
//         // res.send("Api is running Successfully")
//         res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
//     })
// }
// else {
//     app.get("/", (req, res) => {
//         res.send("Api is running Successfully")
//     })
// }


// -----------------------Deployment--------------------



app.use(notFound)
app.use(errorHandler)

const expressserver = app.listen(process.env.PORT || 5000, () => { console.log("Backend Started at port", process.env.PORT) })

const { Server } = require('socket.io')
const chessRoutes = require('./controller/chessRoutes.js')

const io = new Server(expressserver, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on("connection", (socket) => {
    socket.on('setup', () => {
        socket.join("online")
        socket.emit("connected");
    });
    socket.on("setupclose", ()=>{
        socket.leave("online")
        socket.emit("disconnected")
    })
    socket.on("challenge", (data)=>{
        socket.in("online").emit("new challenge", data);
    })
    socket.on("challenge accept", (data)=>{
        socket.in("online").emit("challenge accepted", data)
    })
    socket.on("challenge reject", (data)=>{
        socket.in("online").emit("challenge rejected", data)
    })
    socket.on("personalroom", async (data)=>{
        socket.in("online").emit("personalroom", data)
    })
    socket.on("join game", (room)=>{
        socket.join(room)
    })
    socket.on("leave game", (room)=>{
        socket.leave(room)
    })
    socket.on("fetch", (room)=>{
        socket.in(room).emit("fetch", room)
    })
})
