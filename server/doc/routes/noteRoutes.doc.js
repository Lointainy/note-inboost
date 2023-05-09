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
							$ref: '#/components/schemas/Notes'
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

const createNote = {
	summary: 'Create note',
	description: 'please enter token for auth user, after that you can create note',
	tags: ['Note'],
	security: [{ bearerAuth: [] }],
	requestBody: {
		description: 'Created note object',
		content: {
			' application/json': {
				schema: {
					$ref: '#/components/schemas/Note'
				}
			}
		}
	},
	responses: {
		200: {
			description: 'User create new note'
		},
		500: {
			description: 'Error message'
		}
	}
}

const updateNoteById = {
	summary: 'Update note by id',
	description: 'please enter token for auth user, after that you can update note data',
	tags: ['Note'],
	security: [{ bearerAuth: [] }],
	parameters: [
		{
			name: 'id',
			in: 'path',
			description: 'note id to update',
			required: true,
			schema: {
				type: 'string'
			}
		}
	],
	requestBody: {
		description: 'Updated note',
		content: {
			' application/json': {
				schema: {
					$ref: '#/components/schemas/Note'
				}
			}
		}
	},
	responses: {
		200: {
			description: 'Updated note by id',
			content: {
				'application/json': {
					example: 'Note was Updated'
				}
			}
		},
		400: {
			description: 'No such Note with id'
		},
		500: {
			description: 'Error message'
		}
	}
}

const deleteNoteById = {
	summary: 'Delete note by id',
	description: 'please enter token for auth user, after that you can delete note data',
	tags: ['Note'],
	security: [{ bearerAuth: [] }],
	parameters: [
		{
			name: 'id',
			in: 'path',
			description: 'note id to delete',
			required: true,
			schema: {
				type: 'string'
			}
		}
	],
	responses: {
		200: {
			description: 'Deleted note by id',
			content: {
				'application/json': {
					example: 'Note was Deleted'
				}
			}
		},
		400: {
			description: 'No such Note with id'
		},
		500: {
			description: 'Error message'
		}
	}
}

const noteRouteDoc = {
	'/notes': {
		get: getNotes,
		post: createNote,
		patch: updateNoteById,
		delete: deleteNoteById
	}
}

module.exports = noteRouteDoc

