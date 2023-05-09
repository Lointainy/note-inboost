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

	// try {

	// 	// if (!notes) {
	// 	// 	console.log(1)
	// 	// }

	// 	// if (userData) {
	// 	// 	res.status(200).json(notes)
	// 	// } else {
	// 	// 	res.status(404).json({ msgg: 'No notes' })
	// 	// }
	// } catch (error) {
	// 	res.status(500).json({ msg: error.message })
	// 	console.log(error)
	// }
}

module.exports = { getNotes }

