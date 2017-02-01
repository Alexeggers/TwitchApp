import {Filters, actionTypes} from './StreamActions';
import uuid from 'uuid';
import {combineReducers} from 'redux';

function evaluateStreamJson(streamJson) {
	if (!streamJson.data.stream) {
		return {
			online: false,
			details: "Offline"
		}
	}
	return {
		online: true,
		details: streamJson.data.stream.channel.status
	}
}

function evaluateChannelJson(channelJson) {
	let channel = {
		verified: true
	}
	!channelJson.data.error ? channel.exists = true : channel.exists = false;
	return channel;
}

function stream(state={}, action) {
	switch (action.type) {
		case actionTypes.REQUEST_STREAM_SUCCESS:
			return Object.assign({}, state, evaluateStreamJson(action.stream));
		case actionTypes.REQUEST_STREAM_FAILURE:
			console.error(action.response);
			return Object.assign({}, state, {
				details: "Produced an error, read console for details",
				name: action.name + " produced an error"
			});
		case actionTypes.REQUEST_CHANNEL_SUCCESS:
			return Object.assign({}, state, evaluateChannelJson(action.stream));
		case actionTypes.REQUEST_CHANNEL_FAILURE:
			console.error(action.response);
			return Object.assign({}, state, {
				details: "Produced an error, read console for details",
				name: action.name
			});
		default:
			return state;
	}
}

function streams(state=[], action) {
	switch (action.type) {
		case actionTypes.ADD_STREAM:
			return [
				...state,
				{
					id: uuid.v4(),
					name: action.name,
					details: "",
					verified: false,
					exists: false,
					online: false
				}
			]
		case actionTypes.REMOVE_STREAM:
			return state.filter((stream) => stream.id !== action.id);
		case actionTypes.REQUEST_STREAM_SUCCESS:
		case actionTypes.REQUEST_STREAM_FAILURE:
		case actionTypes.REQUEST_CHANNEL_SUCCESS:
		case actionTypes.REQUEST_CHANNEL_FAILURE:
			return state.map(s => s.name === action.name ? stream(s, action) : s);
		default:
			return state;
	}
}

function visibilityFilter(state=Filters.ALL, action) {
	switch (action.type) {
		case actionTypes.FILTER_STREAMS:
			return action.filter
		default:
			return state
	}
}

const streamApp = combineReducers({
	streams: streams,
	filter: visibilityFilter
});

export default streamApp;