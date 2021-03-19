module.exports = {
  "stories": [
    // "../stories/**/*.stories.mdx",
    // "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/*.stories.@(js)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-jsx",
    // "@storybook/addon-a11y/register",
    // "@storybook/addon-knobs/register",
    // "storybook-addon-jsx/register",
    // "@storybook/addon-jest/register"
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push(
        {
            test: /\.less$/,
            use: [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                    },
                },
                require.resolve('less-loader')
            ]
        },
    );
    return config;
  },
}