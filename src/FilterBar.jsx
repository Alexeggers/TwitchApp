import React from 'react';
import {Filters, filterStreams} from './StreamActions';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => {
	return {
		showAll: () => {
			dispatch(filterStreams(Filters.ALL))
		},
		showOnline: () => {
			dispatch(filterStreams(Filters.ONLINE))
		},
		showOffline: () => {
			dispatch(filterStreams(Filters.OFFLINE))
		}
	}
}

const FilterBar = ({showAll, showOnline, showOffline}) => {
	return (
		<div className="FilterBar">
			<div onClick={showAll}><p>All</p></div>
			<div onClick={showOnline}><p>Online</p></div>
			<div onClick={showOffline}><p>Offline</p></div>
		</div>
	);
}

export default connect(
	null,
	mapDispatchToProps
)(FilterBar);

