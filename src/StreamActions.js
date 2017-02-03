import axios from 'axios';

const twitchApiUrl = 'https://wind-bow.gomix.me/twitch-api/';
const streamsExtension = 'streams/';
const channelsExtension = 'channels/';

export const actionTypes = {
	ADD_STREAM: "ADD_STREAM",
	FINISH_ADD_STREAM: "FINISH_ADD_STREAM",
	CANCEL_ADD_STREAM: "CANCEL_ADD_STREAM",
	REMOVE_STREAM: "REMOVE_STREAM",
	FILTER_STREAMS: "FILTER_STREAMS",
	REQUEST_STREAM_SUCCESS: "REQUEST_STREAM_SUCCESS",
	REQUEST_STREAM_FAILURE: "REQUEST_STREAM_FAILURE",
	REQUEST_CHANNEL_SUCCESS: "REQUEST_CHANNEL_SUCCESS",
	REQUEST_CHANNEL_FAILURE: "REQUEST_CHANNEL_FAILURE"
}

export const Filters = {
	ALL: "ALL",
	ONLINE: "ONLINE",
	OFFLINE: "OFFLINE"
}

function requestStreamSuccess(streamName, stream) {
	return {
		type: actionTypes.REQUEST_STREAM_SUCCESS,
		name: streamName,
		stream: stream
	}
}

function requestStreamFailure(streamName, response) {
	return {
		type: actionTypes.REQUEST_STREAM_FAILURE,
		name: streamName,
		response: response
	}
}

export function fetchStream(streamName) {
	return function(dispatch) {
		return axios.get(twitchApiUrl + streamsExtension + streamName)
			.then(function(response) {
				dispatch(requestStreamSuccess(streamName, response));
			})
			.catch(function(response) {
				dispatch(requestStreamFailure(streamName, response));
			});
	}
}

export function refreshAllStreams() {
	return function(dispatch, getState) {
		const streams = getState().streams;
		console.log(streams);
		streams.forEach(stream => dispatch(fetchStream(stream.name)));
	}
}

function requestChannelSuccess(streamName, stream) {
	return {
		type: actionTypes.REQUEST_CHANNEL_SUCCESS,
		name: streamName,
		stream: stream
	}
}

function requestChannelFailure(streamName, response) {
	return {
		type: actionTypes.REQUEST_CHANNEL_FAILURE,
		name: streamName,
		response: response
	}
}

export function fetchChannel(channelName) {
	return function(dispatch) {
		return axios.get(twitchApiUrl + channelsExtension + channelName)
			.then(response => dispatch(requestChannelSuccess(channelName, response)))
			.then(response => {
				if (!response.stream.data.error) {
					dispatch(fetchStream(channelName))
				}
			})
			.catch(response => dispatch(requestChannelFailure(channelName, response)));
	}
}


export function addStream(streamName) {
	return {type: actionTypes.ADD_STREAM, name: streamName}
}

export function finishAddingStream(streamName) {
	return {type: actionTypes.FINISH_ADD_STREAM, name: streamName}
}

export function cancelAddingStream() {
	return {type: actionTypes.CANCEL_ADD_STREAM}
}

export function removeStream(streamID) {
	return {type: actionTypes.REMOVE_STREAM, id: streamID}
}

export function filterStreams(filter) {
	return {type: actionTypes.FILTER_STREAMS, filter: filter}
}