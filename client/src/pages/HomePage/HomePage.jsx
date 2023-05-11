/* Styles */
import style from './HomePage.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import { faTelegram, faGithub, faBehance } from '@fortawesome/free-brands-svg-icons'

export default function HomePage() {
	const linksList = [
		{
			title: 'Telegram',
			link: 'http://t.me/eug1_kozakov',
			icon: faTelegram
		},
		{
			title: 'Codepholio',
			link: 'https://github.com/Lointainy',
			icon: faGithub
		},
		{
			title: 'Designpholio',
			link: 'https://www.behance.net/eug1_design',
			icon: faBehance
		}
	]
	return (
		<div className={style.page}>
			<h1 className={style.title}>
				Author:
				<span className={style.subtitle}>Eugene Kozakov</span>
			</h1>
			<div className={style.links}>
				<ul className={style.links__list}>
					{linksList.map((i, index) => {
						return (
							<li className={style.links__item} key={index}>
								<a href={i.link}>
									<Icon icon={i.icon} className={style.icon} />
									<span>{i.title}</span>
								</a>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

