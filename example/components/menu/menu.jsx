import styles from './menu.module.scss'
import appConfig from "config/app.config";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { BackButton } from 'components/backButton';

export const Menu = ({ burgerIsOpen, burgerClose, burgerToggle }) => {
	const [allPages, setAllPages] = useState([])
	const [touchStart, setTouchStart] = useState(0);
	const [hasSwiped, setHasSwiped] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		getAllPages().then()
	}, []);

	useEffect(() => {
		if (burgerIsOpen) {
			const timeoutId = setTimeout(openMenu, 50);
			return () => clearTimeout(timeoutId);
		} else {
			const timeoutId = setTimeout(closeMenu, 50);
			return () => clearTimeout(timeoutId);
		}
	  }, [burgerIsOpen]);

	
	const handleTouchStart = (e) => {
		setTouchStart(e.targetTouches[0].clientX);
		setHasSwiped(false)
	}

	const handleTouchMove = (e) => {
		if (touchStart - e.targetTouches[0].clientX < 40) {
			setHasSwiped(true)
		}
	}

	const handleTouchEnd = () => {
		if (hasSwiped) {
			burgerClose()
		}
	}

	const openMenu = () => {
		setIsOpen(true);
	  }

	  const closeMenu = () => {
		setIsOpen(false);
	}

	const getAllPages = async () => {
		try {
			const response = await fetch(`${appConfig.baseUrl}all`);
			const data = await response.json();
			const pages = data.pages.map(item => item.page);
			setAllPages(pages)

		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	return (
		<nav
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			className={classNames(styles.menu, {
				[styles.open]: isOpen,
			})}>
			<div className={styles.burgerHeader}>Pages</div>
			<ul>
				{allPages?.map((link, i) => {
					return (
						<li key={`${link}_${i}`}>
							<Link className={styles.burgerLink} href={`/pageExample/${link}`} onClick={burgerToggle}>
								{link}
								<BackButton />
							</Link>
							
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
