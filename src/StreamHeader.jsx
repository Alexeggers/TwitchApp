import React, { Component } from 'react';

import css from './StreamHeader.css';

export default class StreamHeader extends Component {

	state = {
		showForm: false,
		name: ''
	};

	render() {
		const {showForm, name} = this.state;
		return (
			<div className="StreamHeader">
				<header>
					<button className="newStreamButton" onClick={this.showForm}>+</button>
					<h2>Twitch streams</h2>
				</header>
				{showForm && (
					<form onSubmit={this.handleSubmit}>
						<button type='button' onClick={this.hideForm}>close</button>
						<input name='name' type='text' value={name} onChange={this.handleInput} />
						<button>send</button>
					</form>
				)}
			</div>
		);
	}
	showForm = () => {
		this.setState({
			showForm: true
		});
	};
	hideForm = (arr) => {
		this.setState({
			showForm: false
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		// 
		this.props.newStream(this.state.name);
		this.hideForm();
		this.setState({
			name: ''
		})
	};
	handleInput = (e) => {
		this.setState({
			name: e.target.value
		});
	};
}
