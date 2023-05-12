import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = process.env.REACT_APP_API_URL

export const notesApi = createApi({
	reducerPath: 'notesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}`,
		prepareHeaders: (headers, { getState }) => {
			const { auth } = getState()
			if (auth.token) {
				headers.set('Authorization', `Bearer ${auth.token}`)
			}

			return headers
		}
	}),
	endpoints: (builder) => ({
		getNotes: builder.query({
			query: () => '/notes',
			providesTags: ['Notes']
		}),
		getNoteById: builder.query({
			query: (id) => `/notes/${id}`,
			providesTags: ['Note']
		}),
		updateNote: builder.mutation({
			query: ({ id, note }) => ({
				url: `/notes/${id}`,
				method: 'PATCH',
				body: note
			}),
			invalidatesTags: ['Notes', 'Note']
		}),
		createNote: builder.mutation({
			query: (note) => ({
				url: `/notes`,
				method: 'POST',
				body: note
			}),
			invalidatesTags: ['Notes']
		}),
		deleteNote: builder.mutation({
			query: ({ id }) => ({
				url: `/notes/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Notes']
		})
	})
})

export const { useGetNotesQuery, useGetNoteByIdQuery, useUpdateNoteMutation, useCreateNoteMutation, useDeleteNoteMutation } = notesApi

