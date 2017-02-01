import {connect} from 'react-redux';
import StreamHeader from './StreamHeader';
import {addStream} from './StreamActions';

const mapDispatchToProps = (dispatch) => {
	return {
		newStream: () => {
			dispatch(addStream("AnotherTest"))
		}
	}
}

const StreamHeaderContainer = connect(
	null,
	mapDispatchToProps
)(StreamHeader);

export default StreamHeaderContainer;