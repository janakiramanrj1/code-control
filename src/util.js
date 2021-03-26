const { hasOwnProperty } = Object.prototype;


// Safe wrapper for `hasOwnProperty`
const has = ( object, key ) =>
{
	return hasOwnProperty.call (object, key);
};


export { has };
