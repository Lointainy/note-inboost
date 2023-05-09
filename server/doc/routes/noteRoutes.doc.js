const getNotes = {
	summary: 'Returns the list of all the notes',
	description: 'please enter token for auth user, after that you can take noteSchema data',
	tags: ['Note'],
	security: [{ bearerAuth: [] }],
	responses: {
		200: {
			description: 'The list of notes',
			content: {
				'application/json': {
					schema: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/Note'
						}
					},
					example: '[{note data}, {note data}]'
				}
			}
		},
		404: {
			description: 'No Notes'
		},
		500: {
			description: 'Error message'
		}
	}
}

const noteRouteDoc = {
	'/notes': {
		get: getNotes
	}
}

module.exports = noteRouteDoc

