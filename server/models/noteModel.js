const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema({
	notes: [
		{
			createdAt: { type: Date, default: Date.now },
			updatedAt: { type: Date, default: Date.now },
			title: {
				type: String
			},
			body: {
				type: String
			},
			filter: [
				{
					type: String
				}
			]
		}
	],
	user_id: {
		type: String,
		required: true
	}
})

const Note = mongoose.model('Note', noteSchema)

module.exports = { Note }

