module.exports = {
  env: {
    browser: true,
  },
  root: true,
  extends: 'airbnb-base',
  plugins: [
    'eslint-plugin-import',
  ],
  rules: {
    // we use esm.sh self-hosted and `import from 'https://..' is fine
    'import/no-unresolved': [2, {
      ignore: [
        '^https://esm.archive.org/',
        '^https://offshoot.prod.archive.org/lit',
      ],
    }],

    // allow `import .. from '.js'` (.js suffix) in JS files
    'import/extensions': ['off'],

    'jsx-a11y/label-has-for': 0,
  },
};
