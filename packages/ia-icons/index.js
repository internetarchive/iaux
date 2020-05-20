import * as icons from './src/ia-icons';

Object.keys(icons).forEach((className) => {
  const iconName = className.toLowerCase().replace(/^icon/, '');
  customElements.define(`icon-${iconName}`, icons[className]);
});

export default icons;
