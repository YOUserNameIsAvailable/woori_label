import React, {useEffect, useState} from 'react';
import Input from '@components/ui/form/input';
import useSWR from "swr";

import { useForm } from "react-hook-form";

import { useContext } from "react";
import { useLabelContext } from '@utils/contexts/LabelContext';

function useUpdateLabel() {

}

const EditLabel = () => {
	const labelContext = useLabelContext()

	const [labelKey, setLabelKey] = useState("menu-demos")
	const [labelValue, setLabelValue] = useState("")
	const [v1, setV1] = useState('v1의 기본값');

	return <>
		<Input
            name="b"
            type="text"
            placeholder="KEY"
            inputClassName=" h-[46px] w-full placeholder-[rgba(0, 0, 0, .3)] bg-white border border-[#E3E8EC] rounded-md order-search focus:border-2 focus:outline-none focus:border-skin-primary"
			value={labelKey }
			onChange={(e) => {
				setLabelKey(e.target.value)
			}}
          />
		  
		  <Input
            type="text"
            placeholder="VALUE"
            inputClassName=" h-[46px] w-full placeholder-[rgba(0, 0, 0, .3)] bg-white border border-[#E3E8EC] rounded-md order-search focus:border-2 focus:outline-none focus:border-skin-primary"
			 

			value={labelValue}
			onChange={(e) => {
				setLabelValue(e.target.value)
			}}
          />


		<button
			className="inline-block text-skin-base text-sm px-4 py-2 font-semibold border border-skin-base rounded flex items-center mb-5"
			onClick={() => {
				// alert(JSON.stringify(replacedLabel));
				labelContext.setLabel(labelKey, labelValue)
			} }
		>
			등록 
		</button>
		<button
			className="inline-block text-skin-base text-sm px-4 py-2 font-semibold border border-skin-base rounded flex items-center mb-5"
			onClick={() => {
				alert(JSON.stringify(labelContext.labelMap));

			} }
		>
			조회
		</button>
		<button
			className="inline-block text-skin-base text-sm px-4 py-2 font-semibold border border-skin-base rounded flex items-center mb-5"
			onClick={() => {} }
		>
			삭제
		</button>
	</>
};

export default EditLabel;
