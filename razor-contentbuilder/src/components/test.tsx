import React from 'react';
import {onlyForBuilder, IsEditable} from "./config";
import Link from "next/link";
import {BuilderImage} from "src/builderComponents/builderImage";


const Test = ({
	              text = "default text",
	              href = "/",
	              linkText = "linkText",
	              image = undefined, ...rest
              }) => {


	console.log('TextBuilderProps ', {text, href, linkText, image})
	return (
		<div data-component={"Test"}>

	    <span {...IsEditable({text: "textContent"})} >
	        {text}
	    </span>

			<BuilderImage   {...IsEditable({image: "src"})} width={480} height={200} src={image} alt=""/>
			{onlyForBuilder() && <div> hidden 0</div>}
			<Link   {...IsEditable({href: "href", linkText: "textContent"})} href={href}>{linkText}  </Link>
		</div>
	)
}


export default Test