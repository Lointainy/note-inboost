const { Note } = require('../models/noteModel')

const defaultNote = {
	title: 'First note',
	filter: ['default'],
	body: 'This is your first note'
}

const getNotes = async (req, res) => {
	let user_id = req.user._id

	try {
		let userData = await Note.findOne({ user_id })
		if (userData) {
			let notes = userData.notes
			res.status(200).json(notes)
		} else if (!userData) {
			userData = await Note.create({ notes: defaultNote, user_id })
			res.status(200).json('User create your first Note')
		}
	} catch (error) {
		res.status(500).json({ msg: error.message })
	}
}

const getNoteById = async (req, res) => {
	let user_id = req.user._id
	let note_id = req.params.id

	try {
		let userData = await Note.findOne({ user_id })

		let note = userData.notes.find((n) => n._id == note_id)

		if (note) {
			res.status(200).json(note)
		} else {
			res.status(400).json({ msg: `No such Note with ${note_id}` })
		}
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

const createNote = async (req, res) => {
	let user_id = req.user._id
	let newNote = req.body

	try {
		let userData = await Note.findOne({ user_id })
		userData.notes.push(newNote)

		await userData.save()
		res.status(200).json(`User create new note`)
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

const updateNote = async (req, res) => {
	let user_id = req.user._id
	let note_id = req.params.id
	let updatedNote = req.body

	try {
		let userData = await Note.findOne({ user_id })

		let noteToUpdate = userData.notes.findIndex((n) => n._id == note_id)

		if (noteToUpdate >= 0) {
			userData = await Note.findOneAndUpdate({ user_id, 'notes._id': note_id }, { $set: { 'notes.$': { ...updatedNote, _id: note_id } } })
			res.status(200).json({ msg: `Note was Updated` })
		} else {
			res.status(400).json({ msg: `No such Note with ${note_id}` })
		}
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

const deleteNote = async (req, res) => {
	let user_id = req.user._id
	let note_id = req.params.id

	try {
		let userData = await Note.findOne({ user_id })

		let noteToRemove = userData.notes.findIndex((n) => n._id == note_id)

		if (noteToRemove >= 0) {
			userData.notes.pull({ _id: note_id })
			await userData.save()
			res.status(200).json({ msg: `Note was deleted` })
		} else {
			res.status(400).json({ msg: `No such Note with ${note_id}` })
		}
	} catch (error) {
		res.status(500).json({ msg: error.message })
		console.log(error)
	}
}

module.exports = { getNotes, getNoteById, createNote, updateNote, deleteNote }

