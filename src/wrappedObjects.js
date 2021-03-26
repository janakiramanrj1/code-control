/* Shortcuts to page script objects. */

const gWindow = window.wrappedJSObject;
const gDocument = document.wrappedJSObject;


/* Shortcuts to exposing functions and objects */

const pageFunction = ( func, scope = gWindow, options = { allowCrossOriginArguments: true } ) =>
{
	return exportFunction (func, scope, options);
};

const pageObject = ( obj, scope = gWindow, options = { cloneFunctions: true } ) =>
{
	return cloneInto (obj, scope, options);
};


export { gWindow, gDocument, pageFunction, pageObject };
