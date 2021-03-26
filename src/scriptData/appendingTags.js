import CodeControl from "~/CodeControl.js";
import createScriptData from "~/scriptData/createScriptData.js";


/* Can't make any of these a method of CodeControl or else they just won't work (((:
   I love the extensions API */

function patchScript ( code, url )
{
	const scriptData = createScriptData (CodeControl.scripts.length, code, url);

	CodeControl.scripts.push (scriptData);
	CodeControl.appendingTags.add (scriptData.tag);

	return scriptData.tag;
};

function isTagAppending ( tag )
{
	return CodeControl.appendingTags.has (tag);
};

function onTagAppended ( tag )
{
	if ( CodeControl.appendingTags.has (tag) )
	{
		CodeControl.appendingTags.delete (tag);
	}
};


export { patchScript, isTagAppending, onTagAppended };
