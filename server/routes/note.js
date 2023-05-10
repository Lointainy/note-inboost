const express = require('express')

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { getNotes, createNote, updateNote, deleteNote, getNoteById } = require('../controllers/noteController')

router.use(requireAuth)

router.get('/', getNotes)
router.get('/:id', getNoteById)
router.post('/', createNote)
router.patch('/:id', updateNote)
router.delete('/:id', deleteNote)

module.exports = router

