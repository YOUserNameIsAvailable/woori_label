import { useLabelContext } from "./contexts/LabelContext"
import { useTranslation } from "next-i18next";

export const useLabel = () =>{
    const labelCtx = useLabelContext()
    const trans = useTranslation('menu').t;

    return (key: string) => {
        console.log("useLabel : " + key);
          // 1 // 대체 문구 있는지 확인
        if(labelCtx.labelMap[key] == null) {
            // 2 // 없다면 useTranslation 결과 반환
            console.log('대체문구 X')
            return trans(key);

        } else {
            console.log('대체문구 있음')
            // 2 // 있다면 해당 문구 반환 
            return labelCtx.labelMap[key] || ""
        }
    }
}