import React from "react";

class Register extends React.Component {
	constructor(props){
		super(props);
		this.state={
			email:"",
			password:"",
			name:""
		}

	}

	changeEmail=(event)=>{
		this.setState({email:event.target.value})
	}
	changePass=(event)=>{
		this.setState({password:event.target.value})
	}
	changeName=(event)=>{
		this.setState({name:event.target.value})
	}

	onSubmit=()=>{
		fetch("https://face-smartapp.herokuapp.com/register", {
			method: "post",
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify({
				email:this.state.email,
				password:this.state.password,
				name:this.state.name
			})
		}).then(response=> response.json())
		.then(usr=>{
			if(usr.id){
				this.props.updateUser(usr);
				this.props.changeRoute("home");
			}else{
				alert("user: ", usr.id);
			}
		})
	}	
	
	render(){
		return(
			<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
				<main className="pa4 black-80">
				  
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f4 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input onChange={this.changeName} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
				      </div>				      
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input onChange={this.changeEmail} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange={this.changePass} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick={this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
				    </div>
				 
				  </main>
			</article>

			);
	}
}

export default Register;