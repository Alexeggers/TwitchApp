import {connect} from 'react-redux';
import StreamHeader from './StreamHeader';
import {addStream, refreshAllStreams} from './StreamActions';

const mapDispatchToProps = (dispatch) => {
	return {
		newStream: (name) => {
			dispatch(addStream(name));
		},
		refreshStreams: () => {
			console.log("Firing refresh!");
			dispatch(refreshAllStreams());
		}
	}
}

const StreamHeaderContainer = connect(
	null,
	mapDispatchToProps
)(StreamHeader);

export default StreamHeaderContainer;