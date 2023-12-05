import Link from "next/link";
import {BsChevronDown} from 'react-icons/bs';
import ListMenu from '@components/ui/list-menu';
import SubMega from '@components/ui/mega/sub-mega';
import {useTranslation} from 'next-i18next';
import cn from 'classnames';
import {useEffect, useState} from "react";
import {appConfig} from "@config/index";
import {getAllPagesBuilder} from "@utils/getAllPagesBuilder";

import { useContext } from "react";
import { useLabel } from "@utils/useLabel";


interface MenuProps {
	data: any;
	className?: string;
	bgPrimary?: boolean;
}

const HeaderMenu: React.FC<MenuProps> = ({data, className, bgPrimary}) => {
	const [allPagesBuilder, setAllPagesBuilder] = useState([]);

	useEffect(() => {
		const hostName = window.location.hostname
		async function fetchData() {
			try {
				const data = await getAllPagesBuilder(hostName);
				setAllPagesBuilder(data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
		fetchData();
	}, []);


	/**
	 * 여기 있는 menu 소속 label 은 menu.json 을 무시하고 
	 * 이걸로 넣음
	 * 
	 */

	const label = useLabel()


	return (
		<nav
			className={cn(
				'headerMenu flex w-full ',
				className
			)}
		>
			{data?.map((item: any) => {
					return (
						<div
							className={`menuItem group  py-3 mx-4 xl:mx-5 ${
								item.type != 'mega' ? 'relative' : ''
							}`}
							key={item.id}
						>

							<Link
								href={item.path}
								className={`uppercase inline-flex items-center text-sm text-white py-2 font-medium relative  ${!bgPrimary && 'group-hover:text-skin-primary'}`}
							>
								{label(item.label)}
								{(item?.columns || item.subMenu) && (
									<span
										className={`text-xs w-4 flex justify-end text-white opacity-80 ${!bgPrimary && 'group-hover:text-skin-primary'}`}>
                  <BsChevronDown className="transition duration-300 ease-in-out transform "/>
              </span>
								)}
							</Link>

							{item?.subMenu && Array.isArray(item.subMenu) && (
								<>
									{item?.type != 'mega' ? (
										<div
											className="subMenu shadow-dropDown bg-skin-fill z-30 absolute start-0 opacity-0 group-hover:opacity-100">
											<ul className="text-body text-sm py-5">
												{item.subMenu.map((menu: any, index: number) => {
													const dept: number = 1;
													const menuName: string = `sidebar-menu-${dept}-${index}`;
													return (
														<ListMenu
															dept={dept}
															data={menu}
															hasSubMenu={menu.subMenu}
															menuName={menuName}
															key={menuName}
															menuIndex={index}
														/>
													);
												})}
												{allPagesBuilder?.map((menu: any, index: number) => {
													const dept: number = 1;
													const menuName: string = `sidebar-menu-${dept}-${index}`;
													return (
														<ListMenu
															dept={dept}
															data={menu}
															hasSubMenu={menu.subMenu}
															menuName={menuName}
															key={menuName}
															menuIndex={index}
														/>
													);
												})}
											</ul>
										</div>
									) : (
										<SubMega item={item}/>
									)
									}
								</>


							)}
						</div>
					)
				}
			)}
		</nav>
	);
};

export default HeaderMenu;
