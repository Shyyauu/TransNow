// const bodyParser = require("body-parser")
// const express = require("express")
// const cors = require("cors")
// const deepl = require('deepl-node');

// const app = express()

// app.use(bodyParser.json())
// app.use(cors())

// app.post("/v2/translate", async (req, res) => {
//     const options = {proxy: {host: 'localhost', port: 8080}}
//     const deepl = new deepl.Translator(import.meta.env.VITE_DEEPL_AUTH_KEY, options)
    
//     translator
//         .translateText('Hello, world!', null, 'pl')
//         .then((result) => {
//             console.log(result.text); // Bonjour, le monde !
//         })
//         .catch((error) => {
//             console.error(error);
//         });

//     res.send(translator)

// })

// app.listen(import.meta.env.PORT, () => {
//     console.log("Serwer działa")
// })