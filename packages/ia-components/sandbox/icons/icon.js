import React from 'react';
import Archive from './customsvg/ia-logo-white-icon';
import iconfile from './iconfiles';

function defaultColor(color, name) {
	const icon = iconfile.icons.find(icon => icon.tags[0] === name || icon.tags[1] === name);

	if (!color || color === '')
		return icon.defaultColor
	else return color;

}

function getIcon(props) {
	const { name } = props;
	const icon = iconfile.icons.find(icon => icon.tags[0] === name || icon.tags[1] === name);

	if (icon) {
		const { color, size } = props;
		return (
			<svg width={size} height={size} viewBox="0 0 1024 1024" fill={defaultColor(color, name)}
				xmlns="http://www.w3.org/2000/svg"
				aria-labelledby=`${name}-logo-svg`
				role="img"
			>
				<title id=`${name}-logo-svg`>{name}</title>
				<path d={icon.paths}></path>
			</svg>)
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
	if (props.type == 'avatar') {
		//return <h2>Work in progress...</h2>
	}

	return getIcon(props)

};

export default Icon
