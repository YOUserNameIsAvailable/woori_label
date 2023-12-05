import Link from "next/link";
import Image from "next/image";
import styles from './allPages.module.scss';
import { useLabel } from "@utils/useLabel";
import { LabelContextProvider } from '@utils/contexts/LabelContext';
import EditLabel from "../../../components/editLabel";

import { IoChevronForward } from 'react-icons/io5';
import { IoHomeOutline } from 'react-icons/io5';

const T1_woori = () => {
    const label = useLabel()


    return <>
        우리은행

        <div className={styles.wrapper}>
			<table className="head">
                
				<thead>
                    <tr>
                        <td colspan="2"><Image width={150} height={150} alt="" src="/assets/aa/h1_01.png"/></td>
                        <td></td>
                        <td></td>
                        <td></td>    
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        
                    </tr>
           
                </thead>
                <tbody>
                    <tr>
                        <td>{label('menu-home1')}</td>
                        <td>{label('menu-home2')}</td>
                        <td>{label('menu-home3')}</td>
                        <td>{label('menu-home4')}</td>
                        <td>{label('menu-home5')}</td>
                        <td>{label('menu-home6')}</td>
                        <td>{label('menu-home7')}</td>
                        <td>{label('menu-home8')}</td>
                        <td>{label('menu-home9')}</td>
                        <td>{label('menu-home10')}</td>
                        <td>{label('menu-home11')}</td>
                        <td>{label('menu-home12')}</td>

                    </tr>    
                </tbody>               
			</table>


            <div className="mybreadcrumb ">
                <IoHomeOutline className="me-1.5 text-skin-base text-15px white"/>
                <span>{label('myHomeMsg1')}</span>
                <br/>
                <span className="text-15px" >{label('myHomeMsg2')}</span>
            </div>

            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <div>
                <h1>라벨편집</h1>
                <EditLabel />
            </div>
		</div>
    </>
    
}

export default T1_woori;
    