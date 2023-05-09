const express = require('express')

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { getNotes } = require('../controllers/noteController')

router.use(requireAuth)

router.get('/', getNotes)

module.exports = router

