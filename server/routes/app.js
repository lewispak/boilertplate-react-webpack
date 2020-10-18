// const express = require('express')

// const db = require('../db/db')

// const router = express.Router()

// // GET /api/v1/donart
// router.get('/', (req, res) => {
//     db.getArtworks()
//         .then((artworks) => {
//             return res.json({ artworks })
//         })
//         .catch((err) => {
//             res.status(500).json({ error: err.message })
//         })
// })

// // GET /api/v1/donart/artwork/:id
// router.get('/artwork/:id', (req, res) => {
//     const id = Number(req.params.id)
//     db.getArtworkById(id)
//         .then((singleArt) => {
//             return res.json(singleArt)
//         })
//         .catch((err) => {
//             res.status(500).json({ error: err.message })
//         })
// })

// // GET /api/v1/donart/user/:id
// router.get('/user/:id', (req, res) => {
//     const id = Number(req.params.id)
//     db.getArtistsbyID(id)
//         .then((artist) => {
//             return res.status(200).json(artist)
//         })
//         .catch((err) => {
//             res.status(500).json({ error: err.message })
//         })
// })

// router.get('/CharityBio/:id', (req, res) => {
//     const id = Number(req.params.id)
//     db.getCharityById(id)
//         .then((charity) => {
//             return res.json(charity)
//         })
//         .catch((err) => {
//             console.log(err)
//             res.status(500).json({ error: err.message })
//         })
// })
