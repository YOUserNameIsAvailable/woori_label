import React, {useState} from 'react';
import styles from './converter.module.scss'
import axios from "axios";

async function getExchangeRate() {
	try {
		// Запрос к API для получения курса валют
		const response = await axios.get('https://api.exchangeratesapi.io/latest?base=EUR&symbols=USD');
		// Извлечение курса евро к доллару из ответа
		const rate = response.data.rates.USD;
		console.log(`Текущий курс евро к доллару: ${rate}`);
	} catch (error) {
		console.error('Произошла ошибка:', error);
	}
}

export const Converter = () => {
	const [state, setState] = useState("10");

	return (
		<div className={styles.converter}>
			<label>
				from EUR
				<input value={state} onChange={(e) => setState(e.target.value)} type="text" placeholder={"eur"}/>
			</label>
			<br/>
			to USD
			<input value={state * 1.07390} type="text" placeholder={"usd"}/>
			<br/>
		</div>
	)
}