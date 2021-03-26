import { gWindow, gDocument, pageFunction, pageObject } from "~/wrappedObjects.js";

import createScriptData from "~/scriptData/createScriptData.js";


const CodeControl = pageObject (
{
	scripts: [],
	appendingTags: new Set (),
	funcVars: 0,
});

gWindow.__Ext__CodeControl = CodeControl;


export default CodeControl;
