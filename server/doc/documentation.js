const userSchema = require('./schema/userSchema.doc')
const { notesByUserSchema, singleNoteSchema } = require('./schema/noteSchema.doc')

const userRouteDoc = require('./routes/userRoutes.doc')
const noteRouteDoc = require('./routes/noteRoutes.doc')

const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css'

const swaggerDoc = {
	openapi: '3.0.0',
	info: {
		title: 'Note app',
		version: '1.0.0',
		description: `#### Api for test project \n#### author [contact](https://linktr.ee/lointainy) \n#### My react [project](https://note-app-react-lointainy.netlify.app/)`
	},
	servers: [
		{
			url: 'https://note-app-server-lointainy.vercel.app/api'
		},
		{
			url: 'http://localhost:3500/api'
		}
	],
	tags: [
		{
			name: 'User',
			description: 'user routes'
		},
		{
			name: 'Note',
			description: 'Operations about note'
		}
	],
	paths: {
		...userRouteDoc,
		...noteRouteDoc
	},
	components: {
		schemas: {
			User: userSchema,
			Note: singleNoteSchema,
			Notes: notesByUserSchema
		},
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				description: 'Enter token value',
				bearerFormat: 'JWT',
				example:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDMxYjJiYjAzYWVlZWY3NjcxOGE0ZDEiLCJpYXQiOjE2ODA5ODE0MzksImV4cCI6MTY4MTI0MDYzOX0.x79DREi5tv_YHHEJE2Vwxax3EZwjkZywS20MIeK0JWk'
			}
		}
	},
	security: [
		{
			bearerAuth: []
		}
	]
}

const optionDoc = {
	customCss: '.swagger-ui .topbar { display: none}',
	customSiteTitle: 'Note API',
	customSiteFavicon: '',
	customCssUrl: CSS_URL
}

module.exports = { swaggerDoc, optionDoc }

