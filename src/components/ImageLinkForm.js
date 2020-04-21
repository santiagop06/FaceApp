import React from "react";
import "./css/ImageLinkForm.css"

const ImageLinkForm = ({OnInputChange, onSubmit}) =>{
	return(
		<div>
			<p className="f3">
				{"Try this shit babe"}
			</p>
			<div className="center">
				<div className="center form">
					<input className="f4 pa2 w-70 center" type="text" onChange={OnInputChange}/>
					<button className="w-30 grow f4 link ph pv2 dib white bg-dark-gray" onClick={onSubmit}>Detect</button>
				</div>
			</div>
		</div>
		);
}

export default ImageLinkForm; 