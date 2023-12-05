import {useRouter} from "next/router";
import styles from './backButton.module.scss'
import Image from "next/image";

export const BackButton = () => {
	const router = useRouter()

	const goBack = (e) => {
		e.stopPropagation()
		router.back()
	}

	return (
		<button onClick={goBack} className={styles.btn}>
			<Image className={styles.backImage} width={24} height={24} src="/assets/minimalist-blocks/images/back-button.png" alt="buttonBack"/>
		</button>
	)
}