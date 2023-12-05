import {createPortal} from "react-dom";
import {ThreeCircles} from "react-loader-spinner";


export const FullScreenLoader = ({isLoading}) => {
	return (
		isLoading && createPortal(
			<div className="fixed top-0 w-full h-full bg-[rgba(0,0,0,.5)] z-[99999] flex items-center justify-center">
				<ThreeCircles
					height="80"
					width="80"
					color="#4fa94d"
					wrapperStyle={{}}
					wrapperClass=""
					visible={true}
					ariaLabel="circles-border"
					outerCircleColor="#000"
					innerCircleColor="#fff"
					middleCircleColor="#000"
				/>
			</div>,
			document.body)
	)
}