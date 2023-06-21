const mongoose = require('mongoose')

const GameSchema = mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    black: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    white: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    board: {
        type: String,
        required: true
    },
    moves: {
        type: String
    },
    whoToMove: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isOver: {
        type: Boolean,
        default: false
    },
    wonBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reasonForWin: {
        type: String
    }

}, { timestamps: true })

mongoose.models = {}
const Game = mongoose.model("Game", GameSchema)
module.exports = Game