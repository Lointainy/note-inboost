const singleNoteSchema = {
	type: 'object',
	properties: {
		title: {
			type: 'string',
			example: 'Default Note'
		},
		body: {
			type: 'string',
			example: 'Your default note'
		},
		filter: {
			type: 'array',
			items: {
				type: 'string',
				example: 'Default'
			}
		}
	}
}

const notesByUserSchema = {
	type: 'object',
	properties: {
		notes: {
			type: 'array',
			items: singleNoteSchema
		}
	}
}

module.exports = { notesByUserSchema }

