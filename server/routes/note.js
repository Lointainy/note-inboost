const express = require('express')

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { getNotes, createNote, updateNoteById, deleteNoteById, getNoteById } = require('../controllers/noteController')

router.use(requireAuth)

router.get('/', getNotes)
router.get('/:id', getNoteById)
router.post('/', createNote)
router.patch('/:id', updateNoteById)
router.delete('/:id', deleteNoteById)

module.exports = router

