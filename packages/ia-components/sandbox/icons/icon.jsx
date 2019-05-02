import React from 'react';
import Archive from './customsvg/ia-logo-white-icon'; //TODO integrate Archive's SVG into icon dataset
import iconfile from './iconfiles';

/**
  * setIconColor.gives the named icon a specified color
  * @param {string} name of the Icon to manipulate its color.
  *@param {string} color to use on the icon.
  * @returns the color of passed icon
  *@default returns default color of the icon if no color given.
  */
function setIconColor(color, name) {
	const icon = iconfile.icons.find(icon => icon.tags[0] === name || icon.tags[1] === name);

	if (!color || color === '') return icon.defaultColor;
	return color;

}
    /**
     * getIcon <func>.
     * @param {string}.The name of icon to retrieve.
     * @returns the icon with the supplied name
     * @default returns Internet archive's icon if no name is supplied
     */
function getIcon(props) {
	const { name } = props;
	const icon = iconfile.icons.find(icon => icon.tags[0] === name || icon.tags[1] === name);

	if (icon) {
		const { color, size } = props;
		return (
			<svg width={size} height={size} viewBox="0 0 1024 1024" fill={setIconColor(color, name)}
				xmlns="http://www.w3.org/2000/svg"
				aria-labelledby=`${name}-logo-svg`
				role="img"
			>
				<title id=`${name}-logo-svg`>{name}</title>
				<path d={icon.paths}></path>
			</svg>
		      );
	}
	return <Archive />

}

/**
 * Component to render Icons and  Profile Avatars
 */
const Icon = props => {
	if (props.type === 'avatar') {
		//return <h2>Work in progress...</h2>
	}

	return getIcon(props)

};

export default Icon
