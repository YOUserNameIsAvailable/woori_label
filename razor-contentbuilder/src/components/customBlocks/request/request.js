import React, {useEffect, useState} from 'react';
import styles from './request.module.scss'
import axios from "axios";
async function getUsers(l) {
    let resp = []
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users?_start=0&_limit='+l||1);
        resp=response.data
    } catch (error) {
        console.error('Произошла ошибка:', error);
        resp = "connection error  , do you have acces to https://jsonplaceholder.typicode.com/users  ? "
    }
    return resp
}



export const Request = () => {

    const [long , setLong] =useState("1")
    const [result , setResult ]=useState("");
    useEffect(()=>{
        getUsers(long)
    },[])

    const handler = ()=>{
        getUsers(long).then((data)=>{
            setResult(data)
        }).catch((e)=>{
            setResult(e)
        })
    }
    return <div className={styles.weather}>
        <label  >
            number  of users from api <input value={long} onChange={(e)=>{setLong(e.target.value)}} type="number"/>
        </label>
        <br/>

        <button onClick={handler}> request to server </button>
        <pre>
            <code>
                    {JSON.stringify(result)}
            </code>

        </pre>
    </div>
};
