import React from 'react';
import CreatePost from "./CreatePost";

class Dashboard extends React.Component {

	constructor( props ) {
		super( props );
	}
	
	handleLogout = () => {
		localStorage.removeItem( 'token' );
		window.location.href = '/';
	};


	render() {
		console.warn( localStorage.getItem( 'token' ) );
		return(
			<React.Fragment>
				<button onClick={ this.handleLogout } className="btn btn-secondary ml-3">Logout</button>
				<div className="jumbotron" style={{ height: '100vh' }}>
					<h4>Welcome {this.props.userName && this.props.userName }!!</h4>
					<CreatePost/>
				</div>
			</React.Fragment>
		)
	}
}

export default Dashboard;
