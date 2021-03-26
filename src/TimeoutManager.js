const gWindow = window.wrappedJSObject;

const _setTimeout = gWindow.setTimeout;
const _clearTimeout = gWindow.clearTimeout;

const TimeoutManager =
{
	pending: {},

	removeFromPending ( id )
	{
		delete TimeoutManager.pending[id];
	},

	setTimeout ( func, delay )
	{
		let id;

		const newFunc = ( ...args ) =>
		{
			TimeoutManager.clearTimeout (id);
			func (...args);
		};
		
		id = _setTimeout (newFunc, delay);
		
		TimeoutManager.pending[id] =
		{
			delay,
			startTime: new Date ().getTime (),
			func: newFunc,
		};

		return id;
	},

	clearTimeout ( id )
	{
		_clearTimeout (id);
		TimeoutManager.removeFromPending (id);
	},
};

gWindow.TimeoutManager = cloneInto (TimeoutManager, gWindow, { cloneFunctions: true });