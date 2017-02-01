import React from 'react';

export default ({newStream}) => {
	return (
		<div className="StreamHeader">
			<button className="newStreamButton" onClick={newStream}>+</button>
			<h2>Twitch streams</h2>
		</div>
	);
}