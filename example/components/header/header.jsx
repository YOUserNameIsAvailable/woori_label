import styles from './header.module.scss';
import {BackButton} from "components/backButton";
import classNames from "classnames";
import {Menu} from "components/menu/menu";
import {Burger} from "components/burger/burger";
import React, {useEffect} from "react";
import {useOpen} from "../../hooks/useOpen";
import Link from "next/link";


export const Header = () => {
	const { onToggle: burgerToggle, isOpen: burgerIsOpen, onClose: burgerClose } = useOpen();
	// useEffect(() => {
	// 	if (burgerIsOpen) {
	// 		document.body.style.overflow = "hidden";
	// 	} else {
	// 		document.body.style.overflow = "";
	// 	}
	// }, [burgerIsOpen]);
	return (
		<header className={styles.header}>
			<div className={classNames('container', styles.container)}>
				<Link href={"/"} > Logo</Link>
				<Burger onBurgerToggle={burgerToggle} isBurgerOpen={burgerIsOpen} />
				<Menu burgerIsOpen={burgerIsOpen} burgerClose={burgerClose} burgerToggle={burgerToggle}/>
			</div>
		</header>
	)
}
