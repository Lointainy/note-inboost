/* Styles */
import style from './Workspace.module.scss'

export default function Workspace({ fullsize }) {
	return <div className={`${style.workspace} ${fullsize ? style.fullsize : ''}`}>Workspace</div>
}

