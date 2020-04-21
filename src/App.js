import React, { Component } from 'react';
import Navigation from "./components/Navigation.js"
import Logo from "./components/Logo.js"
import ImageLinkForm from "./components/ImageLinkForm.js"
import Rank from "./components/Rank.js"
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition.js"
import SignIn from "./components/SignIn.js"
import Register from "./components/Register.js"
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
 apiKey: '73b420f0cf99458f8b408031745cea2a'
});

class App extends Component {
	constructor(){
		super();
		this.state={
			input:"",
			url:"",
			box:{},
			route:"signIn",
			isSingIn:false,
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

	onSubmit = (event) =>{
		this.setState({url: this.state.input,
			box:{}
		})

		app.models.predict(
			Clarifai.FACE_DETECT_MODEL, this.state.input)
		.then(response=> this.displayFace(this.calculateFaceLocation(response))).
	    catch(err=> console.log(err))

	}

	OnInputChange = (event) =>{
		this.setState({input: event.target.value});
	}

	changeRoute = (route) => {
		if(route==="home"){
			this.setState({isSingIn:true});
		}else{
			this.setState({isSingIn:false});
		}
		this.setState({route: route});
	}


	render(){
	return (
	    <div className="App">
	    	
	    	<Particles className="particles"/>
	    	<Navigation isSingIn={this.state.isSingIn} changeRoute={this.changeRoute} />
	    	{this.state.route==="home"?
	    		<div>
					<Logo/>
					<Rank/>
					<ImageLinkForm 
						OnInputChange={this.OnInputChange}
						onSubmit={this.onSubmit}
						/>
					<FaceRecognition url={this.state.url} box={this.state.box}/>
				</div>
				:(
					this.state.route==="signIn"?
					<SignIn  changeRoute={this.changeRoute}/>
					:
					<Register changeRoute={this.changeRoute}/>
				)	
			}
	    </div>
	  );
	}
}

export default App;
//style={{display:"flex", justifyContent:"flex-end"}}