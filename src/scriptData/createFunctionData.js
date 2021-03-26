import { pageObject } from "~/wrappedObjects.js";


function createFunctionData ( sourceCode )
{
	return pageObject (
	{
		isDisabled: false,
		useOverride: false,
		override () {},
		sourceCode,
	});
};


export default createFunctionData;
