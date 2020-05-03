import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import brain from "./img/brain.png"

const Logo = () =>{
	return(
		<div className="ma4 mt0" >
			
			<div className="Tilt-inner">
				<img style={{paddingTop:"25px"}}src={brain}/></div>
			
		</div>

		);
}

export default Logo;