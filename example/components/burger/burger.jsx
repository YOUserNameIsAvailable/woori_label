import styles from './burger.module.scss'

export const Burger = ({isBurgerOpen, onBurgerToggle}) => {

	return  <button onClick={onBurgerToggle} className={`${styles.burger} ${isBurgerOpen? styles.active:" "} burger`} aria-label="Mobile menu">
		<span/>
		<span/>
		<span/>
	</button>
};