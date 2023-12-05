import { voidFunction } from '@utils/voidFunction';
import React, {createContext, useContext, useState} from 'react'


type LabelMap = {[labelKey: string]: string}

export const LabelContext = createContext<{
    labelMap: LabelMap;
    setLabel: (labelKey:string, labelValue: string) => void 
}>({
    labelMap: {},
    setLabel: voidFunction 
})

export const LabelContextProvider = (props: {
    initialLabelMap: LabelMap;
    children: React.ReactNode;
}) => {
    const [labelMap, setLabelMap] = useState<LabelMap>(props.initialLabelMap)


    return (
        <LabelContext.Provider value={{ 
            labelMap: labelMap,
            setLabel: (labelKey, labelValue) => {
                setLabelMap((state) => ({
                    ...state,
                    [labelKey]: labelValue
                }))
            }    
        }}>
            {props.children}
        </LabelContext.Provider>
    )
}

export const useLabelContext = () => {
    return useContext(LabelContext)
}