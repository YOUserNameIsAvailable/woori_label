import Link from "next/link";
import {textFromBuilder} from "components/customBlocks/helper";
import Image from "next/image"


const mainTextName = "main-text"
const linkTextName = "link-text"

export const InviteFriend = ({data}) => {
	const mainTextFromBuilder = textFromBuilder({data , textName:mainTextName});
	const linkTextFromBuilder = textFromBuilder({data , textName:linkTextName});

	return (
		<div className="px-6 py-2 bg-gray-900 relative" data-custom="inviteFriend">
			<div
				style={{
					background: "linear-gradient(104deg, #2885D4 9.91%, #063087 90.37%)",
					backgroundSize: '100% 100%',
					height: '162px',
					backgroundRepeat: 'no-repeat',
					overflow: 'hidden',
					paddingRight: '100px',
				}}
				className="flex py-6 pl-6 bg-cover bg-center w-full relative rounded-xl"
			>
				<div className="flex flex-col justify-between">
					<div className="text-white text-base font-bold leading-tight">
						{mainTextFromBuilder}
					</div>
					<Link href="/" className="flex space-x-2 text-cyan-500 no-underline">
						<div style={{ fontSize: '12px' }} className="text-xs font-bold leading-tight">
							{linkTextFromBuilder}
						</div>
						<div style={{ fontSize: '12px' }} className="text-xs font-bold leading-tight">
							&rarr;
						</div>
					</Link>
				</div>
				<Image
					width={162}
					height={166}
					style={{
						position: 'absolute',
						bottom: '-36px',
						right: '-36px',
						width: '162px',
						height: '166px',
						mixBlendMode: 'luminosity',
					}}
					src="/assets/minimalist-blocks/images/pngegg-box.png"
					alt=""
				/>
			</div>
		</div>

	)
}


export const builderInviteFriend = {
	'thumbnail': 'custom/InviteFriend.png ',
	'category': '120',
	'html':
		`
			<div class="px-6 py-2 bg-gray-900 relative" data-custom="inviteFriend">
				<div style="background: linear-gradient(104deg, #2885D4 9.91%, #063087 90.37%); height: 162px; overflow: hidden; padding-right: 100px;"
					class="flex py-6 pl-6 bg-cover bg-center w-full relative rounded-xl">
					<div class=" flex flex-col justify-between ">

						<div data-type="${mainTextName}" class=" text-white text-base font-bold leading-tight ">
							Invite your friends to Finology and get Up to $100 benefits.
						</div>
						<a href="#" class=" flex space-x-2  text-cyan-500  no-underline ">
							<div data-type="${linkTextName}" style="font-size: 12px;" class=" text-xs font-bold leading-tight ">See How</div>
							<div style="font-size: 12px;" class=" text-xs font-bold leading-tight ">&rarr;</div>
						</a>

					</div>
					<img style="width: 162px; height: 166px; position: absolute; bottom: -36px; right: -36px; mix-blend-mode: luminosity; " src="assets/minimalist-blocks/images/pngegg-box.png" alt="" />
				</div>
			</div>
	`
}
