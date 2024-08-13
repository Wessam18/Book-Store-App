const express = require('express')
const router = express.Router()
const book = require('../models/book_db_model')


// add new book
router.post("/", async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author || 
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'send all required fields'
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        const Book = await book.create(newBook)
        res.status(201).send(Book)

    } catch (err) {
        res.status(500).send({message: err.message})
    }
})

//route to get all books from db
router.get("/", async (req, res) => {
    try {
        const Books = await book.find({})
        return res.status(200).json({
            count : Books.length,
            data : Books
        })
    } catch (err) {
        res.status(500).send({message: err.message})
    }
})


//route to get book from db by id
router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const Book = await book.findById(id)
        return res.status(200).json(Book)
    } catch (err) {
        res.status(500).send({message: err.message})
    }
})

// update a book
router.put("/:id", async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author || 
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'send all required fields'
            })
        }
        const {id} = req.params
        const result = await book.findByIdAndUpdate(id, req.body)

        if(!result) {
            return res.status(404).json({message: 'Book Not Found'})
        }
        return res.status(200).send({message: 'Book Updated Successfully'})


    } catch (err) {
        res.status(500).send({message: err.message})
    }
})



// delete a book
router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const result = await book.findByIdAndDelete(id)

        if(!result) {
            return res.status(404).json({message: 'Book Not Found'})
        }
        return res.status(200).send({message: 'Book deleted Successfully'})


    } catch (err) {
        res.status(500).send({message: err.message})
    }
})


module.exports = router
