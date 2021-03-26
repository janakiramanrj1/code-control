import CodeControl from "~/CodeControl.js";

import createScriptData from "~/scriptData/createScriptData.js";
import { patchScript, isTagAppending, onTagAppended } from "~/scriptData/appendingTags.js";

import { gWindow, gDocument, pageFunction } from "~/wrappedObjects.js";


const observer = new MutationObserver (list =>
{
	list.forEach (record =>
	{
		const { target } = record;
		const isParentScript = target?.tagName?.toLowerCase () === "script";

		record.addedNodes.forEach (tag =>
		{
			if ( isTagAppending (tag) )
			{
				onTagAppended (tag);
				return;
			}

			if ( isParentScript )
			{
				const { textContent, parentNode } = tag;

				target.remove ();

				parentNode.appendChild (patchScript (textContent));
			}

			if ( !tag.tagName )
			{
				return;
			}

			const tagName = tag.tagName.toLowerCase ();

			if ( tagName === "script" && tag.hasAttribute ("src") )
			{
				const { src, parentNode } = tag;

				tag.remove ();

				fetch (src, { method: "GET" }).then (response =>
				{
					return response.text ();
				})
				.then (code =>
				{
					parentNode.appendChild (patchScript (code, src));
				})
				.catch (error =>
				{
					// TODO: Add tag to "failed to load" table
					console.error ("Network Error:", error);
				});
			}
		});
	});
});

observer.observe (gDocument.documentElement, { childList: true, subtree: true });

