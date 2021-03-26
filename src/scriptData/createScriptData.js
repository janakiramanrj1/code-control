import { parse } from "espree";
import { generate } from "escodegen";

import createFunctionData from "~/scriptData/createFunctionData.js";
import patchFunction from "~/scriptData/patchFunction.js";
import { extractFunctions } from "~/scriptData/walkTree.js";

import { gDocument, pageObject } from "~/wrappedObjects.js";


function createScriptData ( scriptIndex, originalCode, url = null )
{
	const tree = parse (originalCode, { ecmaVersion: 12 });

	const funcs = extractFunctions (tree).map (( node, funcIndex ) =>
	{
		const funcData = createFunctionData (generate (node));
		patchFunction (node, scriptIndex, funcIndex);

		return funcData;
	});

	const scriptData = pageObject (
	{
		url: url || "",
		code: generate (tree),
		originalCode,
		funcs,
	});

	scriptData.tag = gDocument.createElement ("script");
	scriptData.tag.textContent = scriptData.code;

	return scriptData;
};


export default createScriptData;
