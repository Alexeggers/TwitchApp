import {connect} from 'react-redux';
import {removeStream, fetchChannel} from './StreamActions';

import React, { Component } from 'react';

class StreamItem extends Component {
	componentDidMount() {
		this.props.validateChannel(this.props.name);
	}

	render() {
		return (
			<li className="streamItem">
				<div className="streamInfo" onClick={this.props.openLink.bind(this, this.props.name)}>
					<h2>{this.props.name}</h2>
					<p>{this.props.exists ? this.props.details : "This channel does not seem to exist (anymore?)."}</p>
				</div>
				<div className="streamRemoveButton">
					<button onClick={this.props.deleteStream.bind(this, this.props.id)}>x</button>
				</div>
			</li>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		stream: state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		validateChannel: (channelName) => {
			dispatch(fetchChannel(channelName));
		},
		deleteStream: (id) => {
			dispatch(removeStream(id));
		},
		openLink: (streamName) => { 
			window.open('http://twitch.tv/' + streamName);
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StreamItem);