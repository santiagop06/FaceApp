import React from "react";

const Navigation = ({changeRoute, isSingIn}) =>{
	if(isSingIn){
		return(
			<nav style={{display:"flex", justifyContent:"flex-end"}} >
				<p onClick={()=>changeRoute("signIn")} className="f3 link dim black underline pa3 pointer">Sign Out</p>
			</nav>
			);	
	}else{

		return(
			<nav style={{display:"flex", justifyContent:"flex-end"}} >
				<p onClick={()=>changeRoute("signIn")} className="f3 link dim black underline pa3 pointer">Sign In</p>
				<p onClick={()=>changeRoute("Register")} className="f3 link dim black underline pa3 pointer">Register</p>
			</nav>
			);	
	}
}

export default Navigation;