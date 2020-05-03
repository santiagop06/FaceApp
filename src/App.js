import React, { Component } from 'react';
import Navigation from "./components/Navigation.js"
import Logo from "./components/Logo.js"
import ImageLinkForm from "./components/ImageLinkForm.js"
import Rank from "./components/Rank.js"
import FaceRecognition from "./components/FaceRecognition.js"
import SignIn from "./components/SignIn.js"
import Register from "./components/Register.js"
import Particles from 'react-particles-js';
import './App.css';



class App extends Component {
	constructor(){
		super();
		this.state={
			input:"",
			url:"",
			box:{},
			route:"signIn",
			isSingIn:false,
			user:{
				id:"",
				name: "",
				email: "",
				password: "",
				entries: 0,
				joined: new Date()
			}
		}
	}	

	calculateFaceLocation = (data) =>{
		const coord= data.outputs[0].data.regions[0].region_info.bounding_box;
		console.log(data.outputs[0].data.regions[0].region_info.bounding_box);
		const img= document.getElementById("imageselect");
		const width= Number(img.width);
		const height=Number(img.height);
		return{
			leftCol: width*coord.left_col,
			topRow: height*coord.top_row,
			rightCol: width -(width*coord.right_col),
			bottomRow: height- (height*coord.bottom_row),
		}
	}

	displayFace = (box) =>{
		this.setState({box:box})
		console.log(box);
	}

	updateUser= (data)=>{
		this.setState({
			user:{
				id:data.id,
				name: data.name,
				email: data.email,
				password: data.password,
				entries: data.entries,
				joined: data.joined
			}
		})
	}

	onSubmit = (event) =>{
		this.setState({url: this.state.input,
			box:{}
		})

		fetch("http://face-smartapp.herokuapp.com/imageApi",{
					"method": "post",
					"headers": {"Content-Type":"application/json"},
					"body": JSON.stringify({
						"input": this.state.input
					})
				})
		.then(response=>response.json())
		.then(response=>{
			fetch("http://face-smartapp.herokuapp.com /image",{
					"method": "put",
					"headers": {"Content-Type":"application/json"},
					"body": JSON.stringify({
						"id": this.state.user.id
					})
				}).then(response=> response.json())
				.then(count=>{
					this.setState(Object.assign(this.state.user, {entries:count}))
				})
			 
			this.displayFace(this.calculateFaceLocation(response))
		
		}).catch(err=> console.log(err))

	}

	OnInputChange = (event) =>{
		this.setState({input: event.target.value});
	}

	changeRoute = (route) => {
		if(route==="home"){
			console.log("set route to:", this.state.route );
			this.setState({isSingIn:true});
		}else {
			this.setState({isSingIn:false});
			this.setState({url:""})
		}
		console.log("before set route")
		this.setState({route: route});
	}


	render(){
	return (
	    <div className="App">
	    	
	    	<Particles className="particles"/>
	    	<Navigation isSingIn={this.state.isSingIn} changeRoute={this.changeRoute} />
	    	{console.log("load Navigation")}

	    	{this.state.route==="home"?
	    		<div>
	    			{console.log("load home")}
					<Logo/>
					<Rank name={this.state.user.name} entries={this.state.user.entries}/>
					<ImageLinkForm 
						OnInputChange={this.OnInputChange}
						onSubmit={this.onSubmit}
						/>
					<FaceRecognition url={this.state.url} box={this.state.box}/>
				</div>
				:(
					this.state.route==="signIn"?
					<div>
	    			{console.log("load signIn")}

					<SignIn updateUser={this.updateUser} changeRoute={this.changeRoute}/>
					</div>
					:
					<div>
	    			{console.log("load registe")}
					
					<Register changeRoute={this.changeRoute} updateUser={this.updateUser}/>
					</div>

				)	
			}
	    </div>
	  );
	}
}

export default App;
//style={{display:"flex", justifyContent:"flex-end"}}