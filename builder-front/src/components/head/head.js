import React from 'react';
import Input from "./input";
import {useLocation} from "react-router-dom";
import {Menu} from "./menu";

const Head = ({queryPageParam, rangeValue, setRangeValue}) => {
	const location = useLocation()

	const onHandlerRange = (e) => {
		let value = e.target.value
		setRangeValue(+value)
	}


	return (
    <div>
      <div className="head-wrap p-2 flex-wrap flex w-full z-[9999] relative">
	      <Menu />
        {location.pathname.includes('edit') && !queryPageParam && <Input/>}
      </div>

      {location.pathname.includes('edit') && queryPageParam &&
        <div className='flex justify-center'>
	        <label className='flex flex-col items-center w-1/5'>
		        <span>Viewport <strong>{rangeValue}</strong> px</span>
		        <input className='cursor-pointer w-full' type="range" onChange={(e) => onHandlerRange(e)} defaultValue={360} min={360} max={480}/>
	        </label>
        </div>
      }
    </div>
	);
};
export default Head;
