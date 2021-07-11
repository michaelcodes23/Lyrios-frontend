import React from 'react';
import {GoogleLogin} from 'react-google-login'
import {GoogleLogout} from 'react-google-login'
import {useHistory} from 'react-router-dom'

const Signin = () => {

	let history = useHistory();
	console.log(localStorage.getItem('SessionEmail'))

	const responseGoogle = (response) => {
		console.log(response);
		console.log(response.profileObj)
		localStorage.setItem('SessionEmail', response.profileObj.email)
		localStorage.setItem('SessionName', response.profileObj.name)
		history.push('/show')

	}




	const responseGoogleFail = (response) => {
		console.log(response);
	}

	// const logoutSucesss = () => {
	// 	console.log(localStorage.getItem('SessionEmail'))
	// 	localStorage.removeItem('SessionEmail');
	// 	console.log('logged our successfully')

	// }
	const logoutGoogle = () => {
		console.log('logout was succcessful')
		localStorage.removeItem('SessionEmail')
		history.push('/')
		
	}
return (
	<div>
	{/* <h1>Sign in / Sign Out</h1> */}

	{localStorage.getItem('SessionEmail') === null ? <>
	<GoogleLogin
	clientId = "174189846765-j4m2iko8mnar7ic4c0p0701e5g5gosq9.apps.googleusercontent.com"
	onSuccess={responseGoogle}
	onFailure={responseGoogleFail}
	/>     ; </>
	:
	<GoogleLogout
	clientId = "174189846765-j4m2iko8mnar7ic4c0p0701e5g5gosq9.apps.googleusercontent.com"
	buttonText="Sign Out"
	onLogoutSuccess={logoutGoogle}

	/> 
	}
	</div>
);
};

export default Signin;
