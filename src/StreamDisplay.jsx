import React from 'react';
import StreamItem from './StreamItem';

import {connect} from 'react-redux';
import {Filters} from './StreamActions';

const getVisibleStreams = (streams, filter) => {
	// eslint-disable-next-line
	switch (filter) {
		case Filters.ALL:
			return streams;
		case Filters.ONLINE:
			return streams.filter(s => s.online);
		case Filters.OFFLINE:
			return streams.filter(s => !s.online);
	}

}

const mapStateToProps = (state) => {
	return {
		streams: getVisibleStreams(state.streams, state.filter)
	}
}


const StreamDisplay = ({streams}) => {
	return (
		<div className="streamDisplay">
			<ul className="Streams">
				{streams.map(stream => 
					<StreamItem
						key={stream.id}
						{...stream}
					/>
				)}
			</ul>
		</div>
	)
}

export default connect(
	mapStateToProps
)(StreamDisplay);