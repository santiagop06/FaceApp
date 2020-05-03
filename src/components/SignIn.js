import React from "react";

class SignIn extends React.Component {

	constructor(props){
		super(props);
		this.state={
			email:"",
			password:""
		}

	}

	changeEmail=(event)=>{
		this.setState({email:event.target.value})
	}
	changePass=(event)=>{
		this.setState({password:event.target.value})
	}

	onSubmit=()=>{
		fetch("http://face-smartapp.herokuapp.com/signin", {
			method: "post",
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify({
				email:this.state.email,
				password:this.state.password
			})
		}).then(response=> response.json())
		.then(user=>{

			if(user.id){
				this.props.changeRoute("home");
				this.props.updateUser(user);
				
			}else{
				this.props.changeRoute("signIn");
			}
		})
	}



	render(){
		const {changeRoute}=this.props;
		return(
			<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
				<main className="pa4 black-80">
				  
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.changeEmail}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.changePass}/>
				      </div>
				      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me </label>
				    </fieldset>
				    <div className="">
				      <input 
				      	onClick={this.onSubmit}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Sign in"/>
				    </div>
				    <div className="lh-copy mt3">
				      <a href="#0" onClick={()=>changeRoute("register")} className="f6 link dim black db">Sign up</a>
				      <a href="#0" className="f6 link dim black db">Forgot your password?</a>
				    </div>
				  
				  </main>
			</article>
			);
	}
}

export default SignIn;