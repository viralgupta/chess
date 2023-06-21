const asyncHandler = require('express-async-handler')
const Game = require("../models/Game")
const { Chess } = require('chess.js')
const User = require('../models/User')


const creategame = asyncHandler(async (req, res) => {
    const { user1, user2 } = req.body
    if (!user1 || !user2) {
        res.status(400).json({ success: false, message: "Please Enter all The Fields!" });
    }
    else {
        const chess = new Chess()
        const board = JSON.stringify(chess.board())
        const pgn = chess.pgn()
        const data = {
            users:[
                user1,
                user2
            ],
            black: user1,
            white: user2,
            board: board,
            moves: pgn,
            whoToMove: user2
        }   
        const game = await Game.create(data)
        console.log(game.moves)
        if(game){
            res.status(200).json({success: true, message:"Game Created Successfully!", game: game});  
        }
        else{
            res.status(400).json({success: false, message:"Unable to create Game!"});  
        }
    }
})


const getmoves = asyncHandler(async (req, res) => {
    const { gameid, square } = req.body
    if (!gameid || !square) {
        res.status(400).json({ success: false, message: "Please Enter all The Fields!" });
    }
    else {
        try {
            const game = await Game.findById(gameid)
            const chess = new Chess()
            chess.loadPgn(game.moves)
            const moves = chess.moves({ square: square})
            res.status(200).json({success: true, message:"Available Moves Found!", moves: moves});  
        } catch (error) {
            res.status(400).json({success: false, message:"Unable to find Moves"}); 
            console.log(error)
        }
    }
})

const move = asyncHandler(async (req, res) => {
    const { gameid, presquare, postsquare } = req.body
    if (!gameid || !presquare, !postsquare) {
        res.status(400).json({ success: false, message: "Please Enter all The Fields!" });
    }
    else {
        try {
            const game = await Game.findById(gameid)
            const chess = new Chess()
            chess.loadPgn(game.moves)
            chess.move({ from: presquare, to: postsquare})   
            const newboard = JSON.stringify(chess.board())
            const newpgn = chess.pgn()
            if(chess.isGameOver()){
                let reason = 'No Reason Found'
                if(chess.isInsufficientMaterial()){
                    reason = "Insufficient Material"
                }
                if(chess.isCheckmate()){
                    reason = "Checkmate"
                }
                if(chess.isThreefoldRepetition()){
                    reason = "Three Fold Repetition"
                }
                if(chess.isStalemate()){
                    reason = "Stalemate"
                }
                if(!chess.isInsufficientMaterial()){
                    if(chess.isDraw()){
                        reason = "50 Move Rule"
                    }
                }
                await Game.findByIdAndUpdate(gameid,{
                    moves: newpgn,
                    board: newboard,
                    isOver: true,
                    wonBy: game.whoToMove,
                    reasonForWin: reason
                })
            }
            else{
                if((game.whoToMove).toString() == (game.users[0]).toString()){
                    await Game.findByIdAndUpdate(gameid,{
                        moves: newpgn,
                        board: newboard,
                        whoToMove: game.users[1]
                    })
                }
                else if((game.whoToMove).toString() == (game.users[1]).toString()){
                    await Game.findByIdAndUpdate(gameid,{
                        moves: newpgn,
                        board: newboard,
                        whoToMove: game.users[0]
                    })
                }
            }
            res.status(200).json({success: true, message:"Piece Moved"});  
        } catch (error) {
            res.status(400).json({success: false, message:"Unable to move piece"}); 
            console.log(error)
        }
    }
})

const fetchboard = asyncHandler(async (req, res) => {
    const { gameid } = req.body
    if (!gameid) {
        res.status(400).json({ success: false, message: "Please Enter all The Fields!" });
    }
    else {
        try {
            let game = await Game.findById(gameid).populate("black").populate("white")
            if(game.isOver){
                game = await game.populate("wonBy")
                res.status(200).json({success: true, message:"Board fetched", black: game.black, white:game.white, board: game.board, moves: game.moves, whoToMove: game.whoToMove, isOver: game.isOver, wonBy: game.wonBy, reasonForWin: game.reasonForWin});  
            }
            else{
                res.status(200).json({success: true, message:"Board fetched", black: game.black, white:game.white, board: game.board, moves: game.moves, whoToMove: game.whoToMove, isOver: game.isOver});  
            }
        } catch (error) {
            res.status(400).json({success: false, message:"Unable to fetch board"}); 
            console.log(error)
        }
    }
})


module.exports = { creategame, getmoves, move, fetchboard}