import { has } from "~/util.js";


function walkTree ( tree, callback )
{
	if ( Array.isArray (tree) )
	{
		tree.forEach (node => walkTree (node, callback));
	}
	else if ( typeof tree === "object" && tree !== null && has (tree, "type") )
	{
		callback (tree);

		for ( let key in tree )
		{
			if ( has (tree, key) )
			{
				walkTree (tree[key], callback);
			}
		}
	}
};

function walkFunctions ( tree, callback )
{
	walkTree (tree, node =>
	{
		switch ( node.type )
		{
			// Slightly faster if not more readable than an if statement.
			case "FunctionDeclaration":
			case "FunctionExpression":
			case "ArrowFunctionExpression":
			{
				callback (node);
				break;
			}
		}
	});
};

function extractFunctions ( tree )
{
	const funcs = [];

	walkFunctions (tree, node => funcs.push (node));

	return funcs;
};


export default walkTree;

export { walkFunctions, extractFunctions };
