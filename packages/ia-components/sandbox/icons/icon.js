import React, { Component } from 'react';
import Archive from './customsvg/ia-logo-white-icon';
import iconfile from './iconfiles';

function defaultColor(color, iconName) {
	const icon = iconfile.icons.find(icon => icon.tags[0] === iconName || icon.tags[1] === iconName);

	if (!color) {
		return icon.defaultColor
	} else {
		return color;
	}
}

function getPath(iconName) {

	const icon = iconfile.icons.find(icon => icon.tags[0] === iconName || icon.tags[1] === iconName);

	if (icon) {
		return icon.paths
	} else {
		console.log(`icon ${iconName} does not exist.`);
		return '';
	}

}
/**
 * Component to render Icons and Profile Avatars
 * 
 * 
 * @params See proptypes below
 */
const Icon = props => {
	if (props.type !== 'avatar') {
		return (
			<svg width={props.size} height={iconfile.icons} viewBox="0 0 1024 1024" fill={defaultColor(props.color, props.name)}
				xmlns="http://www.w3.org/2000/svg"
				aria-labelledby={props.name}
				role="img"
			>
				<title id="">{props.name}</title>
				<path d={getPath(props.name)}></path>
			</svg>
		)
	} else {
		//TODO return <Avatar url  size/>
	}
};


export default Icon