'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Internet Archive Design System');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'));

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'));

fractal.components.set('default.preview', '@preview');

fractal.web.set('builder.dest', __dirname + '/build');

/*
 * Create an IA theme
 */
const mandelbrot = require('@frctl/mandelbrot');

const iaTheme = mandelbrot({
  skin: 'black',
  nav: ['docs', 'components'],
  panels: [
    'html',
    'view',
    'context',
    'notes',
    'resources',
    'info',
  ],
  styles: [
    'default',
    // Override Mandelbrot styles to better match the design system
    '/fractal/mandelbrot-override.css',
  ],
});

fractal.web.theme(iaTheme);
