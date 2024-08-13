const express = require("express")
const app = express() 
const {port, connectDb} = require("./config")
const mongoose = require('mongoose')
const book = require('./models/book_db_model')
const router = require('./routes/books_routes')
const cors = require('cors')

//middleware to parse req. body
app.use(express.json())

// middleware to handle CROS policy
//option1: allow all origins with defualt of cors(*)
app.use(cors())
//allow custom origins
//app.use(cors(
//    {
//        origin: 'http://localhost:3000',
//        methods: ['GET', 'POST', 'PUT', 'DELETE'],
//        allowedHeaders: ['content-Type']
//    }
//))

//
app.get("/", (req, res) => {
    res.status(234).send("welcone to my book store")
})

app.use('/books', router)

mongoose
.connect(connectDb)
.then(() => {
    console.log('App connected to DB')
    app.listen(port, () => {
        console.log(`app is listening on port ${port}`)
    })
})
.catch((err) => console.log(err))
