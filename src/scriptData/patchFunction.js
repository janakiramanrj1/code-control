import { parse } from "espree";

import CodeControl from "~/CodeControl.js";
import { walkFunctions } from "~/scriptData/walkTree.js";


/**
 * Takes in a function node and injects code that lets us disable or override it on command.
 *
 * TODO: Let the user input a custom "disabled" return value for each function if they want to.
*
 * TODO: Look into a script that automatically generates static AST-building code from a file
 *       rather than parsing a code string like we do below.
 */
function patchFunction ( node, scriptIndex, funcIndex )
{
	const varName = "__$_CodeControlVar" + CodeControl.funcVars++;

	/* This is how we disable and override functions. It's pretty gross, huh?

	   We have to wrap our code in a function because returns are not allowed outside
	   of functions.

	   The alternative to this would be to just build the AST nodes ourselves and then
	   insert them into the target function, but that is way less flexible.

	   This way, it's much easier to edit our code if we needed to. */
	const code = parse (
	`
	(function ()
	{
			const ${varName} = __Ext__CodeControl.scripts[${scriptIndex}].funcs[${funcIndex}];

			if ( ${varName}.isDisabled )
			{
				return;
			}

			if ( ${varName}.useOverride )
			{
				return ${varName}.override.apply (this, arguments);
			}
	});
	`, { ecmaVersion: 12 });

	let patchBlock = null;
	let patchBody = null;

	/* Extract the code from our wrapper function. */

	walkFunctions (code, func =>
	{
		if ( patchBody === null && patchBlock === null && func.body.type === "BlockStatement" )
		{
			patchBlock = func.body;
			patchBody = patchBlock.body;
		}
	});

	/* Now inject our code into the target function. */

	// Check if function has braces.
	if ( node.type !== "ArrowFunctionExpression" || !node.expression )
	{
		node.body.body = patchBody.concat (node.body.body);
	}
	else
	{
		/* Handle braceless arrow functions by adding braces and returning the old code
		   at the end. */

		patchBody.push (
		{
			type: "ReturnStatement",
			argument: node.body,
		});

		node.body = patchBlock;
		node.expression = false;
	}
};


export default patchFunction;
