// const bodyParser = require("body-parser")
// const express = require("express")
// const cors = require("cors")
// const deepl = require('deepl-node');

// const app = express()

// app.use(bodyParser.json())
// app.use(cors())

// app.post("/v2/translate", async (req, res) => {
//     // const options = {proxy: {host: 'localhost', port: 8080}}
//     const translator = new deepl.Translator(import.meta.env.VITE_DEEPL_AUTH_KEY, options)
    
//     translator
//         .translateText('Hello, world!', null, 'pl')
//         .then((res) => {
//             console.log(res.text); // Bonjour, le monde !
//         })
//         .catch((error) => {
//             console.error(error);
//         });

//     res.send(translator)

// })

// app.listen(import.meta.env.PORT, () => {
//     console.log("Serwer działa")
// })

///////////////////////////////////// 

// import express from 'express'

// const app = express()

// app.get('/api/users', (req, res) => {
//     res.send([{
//         id: 1,
//         name: 'Kacper',
//         age: 13,
//     }, {
//         id: 2,
//         name: 'Dawid',
//         age: 25,
//     }
// ])
// })

// const port = 8080
// app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))