import React from 'react';
import Archive from './customsvg/ia-logo-white-icon';
import iconfile from './iconfiles';

function defaultColor(color, iconName) {
	const icon = iconfile.icons.find(icon => icon.tags[0] === iconName || icon.tags[1] === iconName);

	if (!color) {
		if (!icon) {
			console.error('Couldnt locate the requested icon');

		} else {
			return icon.defaultColor
		}

	} else {
		return color;
	}
}

function getPath(iconName) {

	const icon = iconfile.icons.find(icon => icon.tags[0] === iconName || icon.tags[1] === iconName);

	if (icon) {
		return icon.paths
	} else {
		return <Archive />
	}

}
/**
 * Component to render Icons and Profile Avatars
 * 
 * 
 * @params See proptypes below
 */
const Icon = props => {
	if (props.name === 'archive') {
		return (
			<Archive />
		)
	} else {
		return (<svg width={props.size} height={props.size} viewBox="0 0 1024 1024" fill={defaultColor(props.color, props.name)}
			xmlns="http://www.w3.org/2000/svg"
			aria-labelledby={props.name}
			role="img"
		>
			<title id="">{props.name}</title>
			<path d={getPath(props.name)}></path>
		</svg>
		)

	}
};
Icon.defaultProps = {
	size: 24
};

export default Icon