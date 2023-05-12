import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownPreview({ body }) {
	return (
		<>
			<ReactMarkdown children={body} remarkPlugins={[remarkGfm]}></ReactMarkdown>
		</>
	)
}

