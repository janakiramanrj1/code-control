const path    = require ("path");
const webpack = require ("webpack");

const WebExtPlugin = require ("web-ext-plugin");


const MODE = "development";


module.exports =
{
	entry: "./src/main.js",

	output:
	{
		filename: "code-control.js",
		path:     path.join (__dirname + "/dist"),
	},

	mode: MODE,

	watchOptions:
	{
		ignored: ["**/node_modules", "**/dist"],
	},

	plugins:
	[
		new WebExtPlugin (),
	],

	devtool: "cheap-source-map",

	resolve:
	{
		alias:
		{
			"~": path.resolve (__dirname, "./src"),
		},
	},
};
