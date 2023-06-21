const express = require('express')
const {creategame, getmoves, move, fetchboard} = require('./chesscontroller')
const {protect} = require('../middlewear/authMiddleware')

const chessRoutes = express.Router()

chessRoutes.route('/creategame').post(protect, creategame)
chessRoutes.route('/fetchboard').post(protect, fetchboard)
chessRoutes.route('/getmoves').post(protect, getmoves)
chessRoutes.route('/move').put(protect, move)

module.exports= chessRoutes